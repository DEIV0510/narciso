// Aplica los ganadores de la comparación v1 (portadas originales) vs v2
// (Catalogo_Narciso_3.pdf, mismo esquema de códigos, nuevo render/toma) —
// resultado de un Workflow de 13 agentes viendo ambas fotos por producto.
// Ver README.md y project memory para el detalle del proceso.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'assets', 'img', 'products')
const NEW_DIR = 'C:\\Users\\Lenovo\\AppData\\Local\\Temp\\claude\\C--Users-Lenovo-OneDrive-Escritorio-Claude-Sesiones\\f0167cd0-77ef-4171-95f8-52814fe6893c\\scratchpad\\catalogo3-imgs\\'

const resultsPath = process.argv[2]
if (!resultsPath) {
  console.error('Uso: node apply-photo-v2-winners.mjs <ruta-a-resultado-del-workflow.json>')
  process.exit(1)
}
const data = JSON.parse(readFileSync(resultsPath, 'utf8'))
const results = data.result

const winners = results.filter((r) => r.winner === 'nueva')
console.log('total resultados', results.length, '| ganadores "nueva"', winners.length)

async function run() {
  let done = 0
  for (const w of winners) {
    const src = path.join(NEW_DIR, `new_${w.id}.jpg`)
    const pipeline = sharp(src).resize({ width: 1100, withoutEnlargement: true })
    await pipeline.clone().webp({ quality: 84 }).toFile(path.join(OUT, `${w.id}.webp`))
    await pipeline.clone().avif({ quality: 58 }).toFile(path.join(OUT, `${w.id}.avif`))
    await pipeline.clone().jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, `${w.id}.jpg`))
    done++
    if (done % 40 === 0) console.log(done, '/', winners.length)
  }
  console.log('Listo:', done, 'fotos reemplazadas con la version nueva (Catalogo_Narciso_3.pdf)')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
