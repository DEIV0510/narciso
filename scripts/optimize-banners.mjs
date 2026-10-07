import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Versión liviana (960 px de ancho) de los dos banners del cliente — promo
// 3×$130.000 y Addi. Las tarjetas se muestran a ~530 px de ancho en escritorio
// y ~360 px en móvil, así que esta versión sirve a casi todas las pantallas y
// las originales de 1536 px quedan solo para pantallas retina (srcSet).
// Mismos parámetros de calidad que scripts/optimize-images.mjs.
//
// Uso: node scripts/optimize-banners.mjs
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'source-material')
const OUT = path.join(ROOT, 'src', 'assets', 'img')
const WIDTH = 960

const banners = [
  { src: 'promo-especial.png', out: 'promo-especial-960' },
  { src: 'addi-banner.jpeg', out: 'addi-banner-960' },
]

for (const { src, out } of banners) {
  const base = sharp(path.join(SRC, src)).resize({ width: WIDTH, withoutEnlargement: true })
  await base.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${out}.webp`))
  await base.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${out}.avif`))
  await base.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${out}.jpg`))
  console.log('ok', out)
}
