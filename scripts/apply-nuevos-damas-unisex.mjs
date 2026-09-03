// Integra los lotes "NARCISO_NUEVOS_DAMAS" y "NARCISO_NUEVOS_UNISEX" del
// Escritorio del cliente (hermanos de NARCISO_NUEVOS_CABALLEROS, mismo
// esquema de nombre de archivo = nombre del producto). Cubre los 6 de los
// 7 productos que quedaban sin foto propia (Octans, Bade'e Al Oud Honor &
// Glory, Rehab, Club de Nuit Precieux I, Hawas Fire, 9 PM Rebel) más 12
// reemplazos de fotos que ya estaban bien. Excluye Burberry Her Elixir a
// propósito: la foto nueva sigue mostrando el mismo frasco pálido
// incorrecto (ya van 3 tomas distintas del proveedor con el mismo
// problema), así que no se integra. Ver README.md y project memory.
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'assets', 'img', 'products')
const DAMAS_DIR = 'C:\\Users\\Lenovo\\Desktop\\NARCISO_NUEVOS_DAMAS\\'
const UNISEX_DIR = 'C:\\Users\\Lenovo\\Desktop\\NARCISO_NUEVOS_UNISEX\\'

const MAPPING = [
  // DAMAS
  { file: DAMAS_DIR + 'BFF.jpg', id: 'bff-kim-kardashian-mujer', isNew: false },
  { file: DAMAS_DIR + 'Bond_No_9_labios.jpg', id: 'nolita-bond-no-9-mujer', isNew: false },
  { file: DAMAS_DIR + 'Burberry_Her.jpg', id: 'her-edp-burberry-mujer', isNew: false },
  { file: DAMAS_DIR + 'CH_212_Mujer.jpg', id: '212-nyc-carolina-herrera-mujer', isNew: false },
  { file: DAMAS_DIR + 'CH_212_VIP_Rose.jpg', id: '212-vip-rose-carolina-herrera-mujer', isNew: false },
  { file: DAMAS_DIR + 'CH_Good_Girl.jpg', id: 'good-girl-carolina-herrera-mujer', isNew: false },
  { file: DAMAS_DIR + 'Dolce_Gabbana_Light_Blue.jpg', id: 'light-blue-dolce-gabbana-mujer', isNew: false },
  { file: DAMAS_DIR + 'Jean_Paul_Gaultier_Scandal.jpg', id: 'scandal-jean-paul-gaultier-mujer', isNew: false },
  { file: DAMAS_DIR + 'Lattafa_Yara_Tous.jpg', id: 'yara-tous-lattafa-mujer', isNew: false },
  { file: DAMAS_DIR + 'YSL_Black_Opium.jpg', id: 'black-opium-yves-saint-laurent-mujer', isNew: false },
  // UNISEX
  { file: UNISEX_DIR + 'Afnan_9pm_Rebel.jpg', id: '9-pm-rebel-afnan-unisex', isNew: true },
  { file: UNISEX_DIR + 'Ahli_Octans.jpg', id: 'octans-ahli-unisex', isNew: true },
  { file: UNISEX_DIR + 'Armaf_Club_de_Nuit_Precieux_I.jpg', id: 'club-de-nuit-precieux-i-armaf-unisex', isNew: true },
  { file: UNISEX_DIR + 'Initio_Rehab.jpg', id: 'rehab-initio-parfums-prives-unisex', isNew: true },
  { file: UNISEX_DIR + 'Lattafa_Badee_Al_Oud_Honor_Glory.jpg', id: 'bade-e-al-oud-honor-glory-lattafa-unisex', isNew: true },
  { file: UNISEX_DIR + 'Lattafa_Eclaire.jpg', id: 'eclaire-lattafa-unisex', isNew: false },
  { file: UNISEX_DIR + 'Rasasi_Hawas_For_Him_Fire.jpg', id: 'hawas-fire-rasasi-unisex', isNew: true },
  { file: UNISEX_DIR + 'Tom_Ford_Costa_Azzurra.jpg', id: 'costa-azzurra-tom-ford-unisex', isNew: false },
]

async function run() {
  for (const m of MAPPING) {
    const pipeline = sharp(m.file).resize({ width: 1100, withoutEnlargement: true })
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
