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
const bottleCleanSrc = path.join(SRC, 'botellabien.png')
const logoSrc = path.join(SRC, 'LOGO2.png')
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
  const logoTrim = await sharp(logoSrc).trim({ threshold: 8 }).toBuffer()
  const logoTransparentBuf = await (await makeTransparent(logoTrim)).png().toBuffer()
  await sharp(logoTransparentBuf).resize({ height: 440, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'logo.png'))
  await sharp(logoTransparentBuf).resize({ height: 440, withoutEnlargement: true }).webp({ lossless: true }).toFile(path.join(OUT, 'logo.webp'))

  // 6. Favicon — crop just the crown+laurel mark from the top of the trimmed logo (opaque background needed here).
  const logoMeta = await sharp(logoTrim).metadata()
  const crownH = Math.round(logoMeta.height * 0.52)
  const crownBuf = await sharp(logoTrim)
    .extract({ left: 0, top: 0, width: logoMeta.width, height: crownH })
    .flatten({ background: '#f8f3ea' })
    .toBuffer()
  await sharp(crownBuf).resize(32, 32, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-32.png'))
  await sharp(crownBuf).resize(180, 180, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-180.png'))

  // 6b. Crown mark, transparent and large — real artwork (not hand-drawn) for the loading screen.
  const crownTransparentBuf = await (await makeTransparent(logoTrim)).extract({ left: 0, top: 0, width: logoMeta.width, height: crownH }).png().toBuffer()
  await sharp(crownTransparentBuf).resize({ height: 480, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'crown-mark.png'))
  await sharp(crownTransparentBuf).resize({ height: 480, withoutEnlargement: true }).webp({ lossless: true }).toFile(path.join(OUT, 'crown-mark.webp'))

  // 6c. Catalog bottle — the clean studio shot on white, real photo of the same
  // real Narciso bottle/label used for every fragrance in the catalog (the
  // business sells one bottle format across all "inspired by" scents).
  const catalogTrim = await sharp(bottleCleanSrc).trim({ threshold: 8 }).toBuffer()
  await emit(sharp(catalogTrim).resize({ width: 900, withoutEnlargement: true }), 'catalog-bottle')

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
