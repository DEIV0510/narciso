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
const logoSrc = path.join(SRC, 'LOGO2.png')
const craftPosterSrc = path.join(SRC, 'craft-poster-raw.jpg')

async function emit(pipeline, outBase) {
  await pipeline.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${outBase}.webp`))
  await pipeline.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${outBase}.avif`))
  await pipeline.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${outBase}.jpg`))
}

async function run() {
  const meta = await sharp(bottleSrc).metadata()
  console.log('botella.png', meta.width, 'x', meta.height)

  // 1. HERO — full real photograph, trimmed of the thin black letterbox bars, large size for the protagonist hero shot.
  const heroBase = sharp(bottleSrc).rotate()
  const heroTrim = await heroBase.clone().trim({ threshold: 12 }).toBuffer()
  await emit(sharp(heroTrim).resize({ width: 1600, withoutEnlargement: true }), 'hero-bottle')

  // 2. SPOTLIGHT — tighter crop centered on the hero bottle for the product spotlight card / gallery main image.
  const trimmedMeta = await sharp(heroTrim).metadata()
  const tw = trimmedMeta.width
  const th = trimmedMeta.height
  const cropW = Math.round(tw * 0.62)
  const cropH = Math.round(th * 0.92)
  const spotlightBuf = await sharp(heroTrim)
    .extract({
      left: Math.round((tw - cropW) / 2),
      top: Math.round(th * 0.02),
      width: cropW,
      height: Math.min(cropH, th - Math.round(th * 0.02)),
    })
    .toBuffer()
  await emit(sharp(spotlightBuf).resize({ width: 1200, withoutEnlargement: true }), 'spotlight-bottle')

  // 3. LABEL DETAIL — close crop on the label/cap area, real second "gallery" angle from the same photograph.
  const labelBuf = await sharp(heroTrim)
    .extract({
      left: Math.round(tw * 0.28),
      top: Math.round(th * 0.28),
      width: Math.round(tw * 0.46),
      height: Math.round(th * 0.6),
    })
    .toBuffer()
  await emit(sharp(labelBuf).resize({ width: 1100, withoutEnlargement: true }), 'label-detail')

  // 4. OG image — 1200x630 cover crop for social sharing.
  await sharp(heroTrim)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'))

  // 5. Logo — trim the whitespace margin around the real vector-drawn logo, keep as-is otherwise.
  const logoTrim = await sharp(logoSrc).trim({ threshold: 8 }).toBuffer()
  await sharp(logoTrim).resize({ height: 220, withoutEnlargement: true }).png({ quality: 90 }).toFile(path.join(OUT, 'logo.png'))
  await sharp(logoTrim).resize({ height: 440, withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(OUT, 'logo.webp'))

  // 6. Favicon — crop just the crown+laurel mark from the top of the trimmed logo.
  const logoMeta = await sharp(logoTrim).metadata()
  const crownH = Math.round(logoMeta.height * 0.52)
  const crownBuf = await sharp(logoTrim)
    .extract({ left: 0, top: 0, width: logoMeta.width, height: crownH })
    .flatten({ background: '#f8f3ea' })
    .toBuffer()
  await sharp(crownBuf).resize(32, 32, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-32.png'))
  await sharp(crownBuf).resize(180, 180, { fit: 'contain', background: '#f8f3ea' }).png().toFile(path.join(PUBLIC, 'favicon-180.png'))

  // 7. Craft poster — still frame from the real crafting video, used as the
  // click-to-play poster for the "Detrás de la fragancia" section.
  await emit(sharp(craftPosterSrc).resize({ width: 1000, withoutEnlargement: true }), 'craft-poster')

  console.log('Image optimization complete.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
