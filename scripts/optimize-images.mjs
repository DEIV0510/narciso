import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'source-material')
const OUT = path.join(ROOT, 'src', 'assets', 'img')
const PUBLIC = path.join(ROOT, 'public')

mkdirSync(OUT, { recursive: true })
mkdirSync(PUBLIC, { recursive: true })

const bottleSrc = path.join(SRC, 'botella.png')
const bottleOficialSrc = path.join(SRC, 'botella-oficial.png')
const logoSrc = path.join(SRC, 'logo-oficial.png')
const craftPosterSrc = path.join(SRC, 'craft-poster-raw.jpg')
const lifestylePosterSrc = path.join(SRC, 'lifestyle-poster-raw.jpg')
const studioPosterSrc = path.join(SRC, 'studio-poster-raw.jpg')

async function emit(pipeline, outBase) {
  await pipeline.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${outBase}.webp`))
  await pipeline.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${outBase}.avif`))
  await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${outBase}.jpg`))
}

// Convierte el fondo blanco/casi-blanco del logo real en transparencia real
// (no solo recorte del margen) para que se vea bien sobre cualquier fondo.
async function makeTransparent(buffer, { threshold = 242, feather = 18 } = {}) {
  const img = sharp(buffer).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lightness = (r + g + b) / 3
    if (lightness >= threshold) {
      data[i + 3] = 0
    } else if (lightness >= threshold - feather) {
      const t = (threshold - lightness) / feather
      data[i + 3] = Math.round(255 * t)
    }
  }
  return sharp(data, { raw: { width, height, channels } })
}

// Quita SOLO el fondo blanco de estudio (conectado al borde de la foto) y lo
// vuelve transparente, sin tocar el blanco de la etiqueta del frasco (que
// está rodeado de vidrio oscuro, nunca conectado al borde). A diferencia de
// makeTransparent() (umbral global), esto usa flood-fill desde los bordes.
// No se usa en este momento (la foto actual del frasco es de ambiente, no
// de estudio) — se deja lista por si el cliente manda otra foto de fondo
// plano en el futuro.
async function removeStudioBackground(buffer, { threshold = 232 } = {}) {
  const img = sharp(buffer).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const total = width * height
  const visited = new Uint8Array(total)
  const isBg = (p) => {
    const i = p * channels
    return (data[i] + data[i + 1] + data[i + 2]) / 3 >= threshold
  }

  const queue = new Int32Array(total)
  let qHead = 0
  let qTail = 0
  const pushSeed = (p) => {
    if (!visited[p]) {
      visited[p] = 1
      queue[qTail++] = p
    }
  }
  for (let x = 0; x < width; x++) {
    pushSeed(x)
    pushSeed((height - 1) * width + x)
  }
  for (let y = 0; y < height; y++) {
    pushSeed(y * width)
    pushSeed(y * width + (width - 1))
  }

  while (qHead < qTail) {
    const p = queue[qHead++]
    if (!isBg(p)) continue
    data[p * channels + 3] = 0
    const x = p % width
    const y = (p / width) | 0
    if (x > 0 && !visited[p - 1]) {
      visited[p - 1] = 1
      queue[qTail++] = p - 1
    }
    if (x < width - 1 && !visited[p + 1]) {
      visited[p + 1] = 1
      queue[qTail++] = p + 1
    }
    if (y > 0 && !visited[p - width]) {
      visited[p - width] = 1
      queue[qTail++] = p - width
    }
    if (y < height - 1 && !visited[p + width]) {
      visited[p + width] = 1
      queue[qTail++] = p + width
    }
  }

  return sharp(data, { raw: { width, height, channels } })
}

// Recorta un objeto de una foto real usando una silueta trazada a mano
// (lista de puntos [x,y]) en vez de flood-fill: `botella-oficial.png` es una
// foto de ambiente (mostrador de madera, estantería de botellas desenfocada
// de fondo), no un fondo de estudio uniforme, así que removeStudioBackground()
// no sirve aquí — no hay un solo color de fondo que quitar.
async function maskWithSilhouette(src, points, { feather = 1.2 } = {}) {
  const meta = await sharp(src).metadata()
  const { width, height } = meta
  const d = 'M ' + points.map((p) => p.join(',')).join(' L ') + ' Z'
  const maskSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="white" /></svg>`
  )
  const maskFeathered = await sharp(maskSvg).png().toBuffer().then((b) => sharp(b).blur(feather).toBuffer())
  const photo = await sharp(src).ensureAlpha().toBuffer()
  // Materializado a buffer aquí mismo (no se retorna el pipeline sharp()
  // sin resolver): encadenar .trim()/.resize() sobre un composite() todavía
  // sin ejecutar hacía que sharp calculara mal las dimensiones del insumo
  // ("Image to composite must have same dimensions or smaller") pese a que
  // ambas imágenes ya coincidían en tamaño.
  const composited = await sharp(photo).composite([{ input: maskFeathered, blend: 'dest-in' }]).png().toBuffer()
  return sharp(composited)
}

// Silueta de botella-oficial.png (1086x1448), medida en dos pasadas:
// 1. Rociador/tapa (y 358-619): escaneo de luminancia píxel por píxel contra
//    la foto fuente (el fondo ahí es oscuro y parejo, así que un umbral
//    funciona bien) — NO a ojo: la tapa es traslúcida/reflectante y trazarla
//    a mano dejaba sistemáticamente una cuña oscura de más en la punta.
// 2. Cuello/hombro/cuerpo/base (y 619+): trazado a mano contra una cuadrícula
//    de coordenadas superpuesta a recortes ampliados de la foto. En la zona
//    del hombro/cuerpo hay otras botellas oscuras desenfocadas justo detrás
//    de la nuestra en la foto original, indistinguibles de la nuestra por
//    color — se usó una curva más conservadora (un poco más adentro) en vez
//    de perseguir esa lectura ambigua, para no dejar un pedazo de la botella
//    vecina en el recorte.
const BOTTLE_OFICIAL_SILHOUETTE = [
  [645, 358],
  [648, 364],
  [650, 373],
  [650, 385],
  [649, 394],
  [648, 403],
  [647, 412],
  [646, 418],
  [645, 424],
  [643, 433],
  [641, 439],
  [640, 445],
  [639, 451],
  [637, 460],
  [635, 466],
  [660, 478],
  [677, 487],
  [685, 499],
  [686, 511],
  [685, 523],
  [687, 535],
  [616, 538],
  [610, 556],
  [604, 574],
  [599, 592],
  [602, 601],
  [606, 610],
  [606, 619],
  [575, 625],
  [598, 645],
  [620, 670],
  [638, 700],
  [648, 740],
  [652, 790],
  [648, 850],
  [640, 950],
  [635, 1050],
  [645, 1110],
  [672, 1150],
  [672, 1180],
  [668, 1195],
  [655, 1207],
  [630, 1217],
  [600, 1224],
  [550, 1228],
  [515, 1229],
  [480, 1228],
  [430, 1224],
  [400, 1217],
  [375, 1207],
  [362, 1195],
  [358, 1180],
  [358, 1150],
  [369, 790],
  [369, 775],
  [369, 760],
  [370, 745],
  [378, 720],
  [390, 705],
  [410, 692],
  [430, 682],
  [443, 675],
  [455, 670],
  [463, 619],
  [463, 607],
  [468, 589],
  [469, 583],
  [469, 568],
  [468, 559],
  [465, 535],
  [464, 529],
  [461, 520],
  [461, 514],
  [459, 496],
  [458, 478],
  [456, 469],
  [467, 463],
  [506, 457],
  [553, 451],
  [576, 445],
  [590, 433],
  [604, 415],
  [615, 400],
  [624, 388],
  [631, 379],
  [638, 370],
]

async function run() {
  const meta = await sharp(bottleSrc).metadata()
  console.log('botella.png', meta.width, 'x', meta.height)

  // 1. HERO — full real photograph, trimmed of the thin black letterbox bars, large size for the protagonist hero shot.
  const heroBase = sharp(bottleSrc).rotate()
  const heroTrim = await heroBase.clone().trim({ threshold: 12 }).toBuffer()
  await emit(sharp(heroTrim).resize({ width: 1600, withoutEnlargement: true }), 'hero-bottle')

  // 2. SPOTLIGHT — tighter crop centered on the hero bottle for the product spotlight card / gallery main image.
  // Recorte más amplio que antes (más píxeles nativos = menos borrosidad al mostrarlo grande).
  const trimmedMeta = await sharp(heroTrim).metadata()
  const tw = trimmedMeta.width
  const th = trimmedMeta.height
  const cropW = Math.round(tw * 0.68)
  const cropH = Math.round(th * 0.94)
  const spotlightBuf = await sharp(heroTrim)
    .extract({
      left: Math.round((tw - cropW) / 2),
      top: Math.round(th * 0.02),
      width: cropW,
      height: Math.min(cropH, th - Math.round(th * 0.02)),
    })
    .toBuffer()
  await emit(sharp(spotlightBuf).resize({ width: 1200, withoutEnlargement: true }), 'spotlight-bottle')

  // 3. LABEL DETAIL — crop sobre la etiqueta/tapa, segundo ángulo real de la misma fotografía.
  // Más amplio que un close-up extremo para conservar resolución nativa decente.
  const labelBuf = await sharp(heroTrim)
    .extract({
      left: Math.round(tw * 0.16),
      top: Math.round(th * 0.24),
      width: Math.round(tw * 0.68),
      height: Math.round(th * 0.74),
    })
    .toBuffer()
  await emit(sharp(labelBuf).resize({ width: 1100, withoutEnlargement: true }), 'label-detail')

  // 4. OG image — 1200x630 cover crop for social sharing.
  await sharp(heroTrim)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))

  // 5. Logo — trim the whitespace margin, then key out the white background for
  // real transparency (not just a cropped white box) so it sits cleanly on any surface.
  // El logo oficial tiene degradados/biseles (no colores planos como el logo
  // anterior), así que lossless/truecolor pesa mucho para un asset tan
  // pequeño en pantalla — se usa lossy de alta calidad + PNG con paleta
  // (visualmente idéntico, ~70% más liviano).
  const logoTrim = await sharp(logoSrc).trim({ threshold: 8 }).toBuffer()
  const logoTransparentBuf = await (await makeTransparent(logoTrim)).png().toBuffer()
  await sharp(logoTransparentBuf).resize({ height: 440, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(path.join(OUT, 'logo.png'))
  await sharp(logoTransparentBuf).resize({ height: 440, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 90 }).toFile(path.join(OUT, 'logo.webp'))

  // 6. Favicon — crop just the crown+laurel mark from the top of the trimmed logo (opaque background needed here).
  // 0.70 mide el hueco real entre el emblema y la palabra "NARCISO" en el
  // logo oficial (medido con un scan fila-por-fila del PNG fuente).
  const logoMeta = await sharp(logoTrim).metadata()
  const crownH = Math.round(logoMeta.height * 0.7)
  const crownBuf = await sharp(logoTrim)
    .extract({ left: 0, top: 0, width: logoMeta.width, height: crownH })
    .flatten({ background: '#f8f3ea' })
    .toBuffer()
  await sharp(crownBuf).resize(32, 32, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-32.png'))
  await sharp(crownBuf).resize(180, 180, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-180.png'))

  // 6b. Crown mark, transparent and large — real artwork (not hand-drawn) for the loading screen.
  // Este asset carga en el primer paint de CADA página (pantalla de carga),
  // así que el peso importa más que en cualquier otra imagen del sitio.
  const crownTransparentBuf = await (await makeTransparent(logoTrim)).extract({ left: 0, top: 0, width: logoMeta.width, height: crownH }).png().toBuffer()
  await sharp(crownTransparentBuf).resize({ height: 480, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 95 }).toFile(path.join(OUT, 'crown-mark.png'))
  await sharp(crownTransparentBuf).resize({ height: 480, withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 90 }).toFile(path.join(OUT, 'crown-mark.webp'))

  // 6c. Catalog bottle — real photo of the current Narciso bottle/label used
  // for every fragrance in the catalog (the business sells one bottle
  // format across all "inspired by" scents). This replaces an older photo
  // of the same bottle: the real hardware changed from a round ball cap to
  // the angular spray-nozzle cap seen here, and the label now matches the
  // official gold crown+laurel logo. Isolated with a hand-traced silhouette
  // mask (see maskWithSilhouette above) since this is a lifestyle photo
  // with no plain background to flood-fill.
  const catalogTransparent = await (await maskWithSilhouette(bottleOficialSrc, BOTTLE_OFICIAL_SILHOUETTE))
    .trim({ threshold: 5 })
    .resize({ width: 900, withoutEnlargement: true })
    .png()
    .toBuffer()
  await sharp(catalogTransparent).webp({ quality: 90, alphaQuality: 90 }).toFile(path.join(OUT, 'catalog-bottle.webp'))
  await sharp(catalogTransparent).avif({ quality: 60 }).toFile(path.join(OUT, 'catalog-bottle.avif'))
  // Fallback JPG (no alpha support): flatten onto the same ink-900 the cards use, so it still blends.
  await sharp(catalogTransparent).flatten({ background: '#0e0c0a' }).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(OUT, 'catalog-bottle.jpg'))

  // 7. Video posters — real still frames from the 3 real videos, used as
  // click-to-play posters for the "Detrás de la fragancia" gallery.
  await emit(sharp(craftPosterSrc).resize({ width: 1000, withoutEnlargement: true }), 'craft-poster')
  await emit(sharp(lifestylePosterSrc).resize({ width: 760, withoutEnlargement: true }), 'lifestyle-poster')
  await emit(sharp(studioPosterSrc).resize({ width: 1000, withoutEnlargement: true }), 'studio-poster')

  console.log('Image optimization complete.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
