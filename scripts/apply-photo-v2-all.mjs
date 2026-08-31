// Unifica el fondo de las 256 fotos de producto usando SIEMPRE la versión de
// Catalogo_Narciso_3.pdf (piso con reflejo + luz direccional), en vez de
// mezclarla con la tanda anterior (fondo plano) según cuál se viera "mejor"
// por separado. El cliente pidió que todas compartan el mismo fondo/estilo
// de estudio; la comparación anterior (apply-photo-v2-winners.mjs) mezclaba
// dos sesiones de fotos visualmente distintas. Ver README.md y project memory.
import sharp from 'sharp'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'assets', 'img', 'products')
const NEW_DIR = 'C:\\Users\\Lenovo\\AppData\\Local\\Temp\\claude\\C--Users-Lenovo-OneDrive-Escritorio-Claude-Sesiones\\f0167cd0-77ef-4171-95f8-52814fe6893c\\scratchpad\\catalogo3-imgs\\'

const files = readdirSync(NEW_DIR).filter((f) => f.startsWith('new_') && f.endsWith('.jpg'))
console.log('fotos fuente encontradas:', files.length)

async function run() {
  let done = 0
  for (const file of files) {
    const id = file.replace(/^new_/, '').replace(/\.jpg$/, '')
    const src = path.join(NEW_DIR, file)
    const pipeline = sharp(src).resize({ width: 1100, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 84 }).toFile(path.join(OUT, `${id}.webp`))
    await pipeline.clone().avif({ quality: 58 }).toFile(path.join(OUT, `${id}.avif`))
    await pipeline.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, `${id}.jpg`))
    done++
    if (done % 40 === 0) console.log(done, '/', files.length)
  }
  console.log('Listo:', done, 'productos unificados con el fondo de Catalogo_Narciso_3.pdf')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
