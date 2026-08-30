// Resuelve `product.image` (id del producto, o 'catalog-bottle' para los
// pocos productos sin foto propia) a sus 3 formatos optimizados. Las fotos
// individuales viven en assets/img/products/ (generadas por
// scripts/optimize-product-photos.mjs); import.meta.glob las carga todas
// de una vez en build time sin tener que importar cada archivo a mano.
import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'

const webpModules = import.meta.glob('../assets/img/products/*.webp', { eager: true, import: 'default' })
const avifModules = import.meta.glob('../assets/img/products/*.avif', { eager: true, import: 'default' })
const jpgModules = import.meta.glob('../assets/img/products/*.jpg', { eager: true, import: 'default' })

function extractId(filePath) {
  return filePath.split('/').pop().replace(/\.(webp|avif|jpg)$/, '')
}

const images = {
  'catalog-bottle': { avif: catalogAvif, webp: catalogWebp, jpg: catalogJpg },
}

for (const [filePath, mod] of Object.entries(webpModules)) {
  const id = extractId(filePath)
  images[id] = { ...images[id], webp: mod }
}
for (const [filePath, mod] of Object.entries(avifModules)) {
  const id = extractId(filePath)
  images[id] = { ...images[id], avif: mod }
}
for (const [filePath, mod] of Object.entries(jpgModules)) {
  const id = extractId(filePath)
  images[id] = { ...images[id], jpg: mod }
}

// Devuelve { avif, webp, jpg } para el `image` de un producto, o la foto
// genérica compartida si no se encuentra (nunca debería pasar, pero evita
// una imagen rota si algún día falta un archivo).
export function getProductImage(imageId) {
  return images[imageId] || images['catalog-bottle']
}
