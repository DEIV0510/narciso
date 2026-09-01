// Integra el lote de fotos "NARCISO_NUEVOS_CABALLEROS" del Escritorio del
// cliente: 6 reemplazos de fotos existentes + 5 fotos nuevas para productos
// que no tenían (incluye 2 de los 8 productos revertidos por mal-
// emparejamiento frasco↔marca — ver README.md y project memory).
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'assets', 'img', 'products')
const SRC_DIR = 'C:\\Users\\Lenovo\\Desktop\\NARCISO_NUEVOS_CABALLEROS\\'

const MAPPING = [
  { file: '212 sexy me.jpg', id: '212-sexy-men-carolina-herrera-hombre', isNew: false },
  { file: 'Boss the scent elixir.jpg', id: 'the-scent-elixir-hugo-boss-hombre', isNew: false },
  { file: 'Ck men euphoria.jpg', id: 'euphoria-calvin-klein-hombre', isNew: false },
  { file: 'Hawas ice.jpg', id: 'hawas-ice-rasasi-hombre', isNew: true },
  { file: 'Invictus onix.jpg', id: 'invictus-onyx-paco-rabanne-hombre', isNew: false },
  { file: 'Invictus parfum.jpg', id: 'invictus-parfum-paco-rabanne-hombre', isNew: false },
  { file: 'Le male parfum.jpg', id: 'le-male-le-parfum-jean-paul-gaultier-hombre', isNew: false },
  { file: 'Mandarín sky.jpg', id: 'odyssey-mandarin-sky-armaf-hombre', isNew: true },
  { file: 'Myslf le parfum.jpg', id: 'myslf-le-parfum-yves-saint-laurent-hombre', isNew: true },
  { file: 'Prada luna rossa carbón.jpg', id: 'luna-rossa-carbon-prada-hombre', isNew: true },
  { file: 'Supremacy collector.jpg', id: 'supremacy-collector-s-edition-afnan-hombre', isNew: true },
]

async function run() {
  for (const m of MAPPING) {
    const src = path.join(SRC_DIR, m.file)
    const pipeline = sharp(src).resize({ width: 1100, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 84 }).toFile(path.join(OUT, `${m.id}.webp`))
    await pipeline.clone().avif({ quality: 58 }).toFile(path.join(OUT, `${m.id}.avif`))
    await pipeline.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, `${m.id}.jpg`))
    console.log((m.isNew ? '[nuevo] ' : '[reemplazo] ') + m.id)
  }
  console.log('Listo:', MAPPING.length, 'fotos procesadas.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
