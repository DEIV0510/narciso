// Interruptor de la campaña visual de San Valentín — capa puramente estética
// sobre la identidad real de Gentleman Co (NO toca catálogo, precios,
// notas, contacto ni funcionalidades). Cuando termine la temporada, poner
// esta bandera en `false` quita toda la ambientación de un solo lugar sin
// tener que revisar componente por componente.
export const VALENTINES_ACTIVE = true

export const valentinesCopy = {
  promoBar: 'Especial San Valentín · Elige tu fragancia · Regala una experiencia',
  heroEyebrow: 'Edición San Valentín',
  heroLine: 'Celebra el amor con una fragancia',
  catalogEyebrow: 'Edición San Valentín',
  catalogLine: 'Favoritos para regalar en San Valentín',
  giftBadge: 'Ideal para regalar',
  giftGuideEyebrow: 'San Valentín',
  giftGuideTitle: 'El regalo perfecto tiene aroma',
  giftGuideLine: 'Encuentra la fragancia ideal para cada persona especial.',
  promoImageAlt: 'Promoción especial Gentleman Co: elige 3 fragancias por $130.000 COP',
  footerNote: 'Con amor, Gentleman Co.',
}

// Las 3 tarjetas de la sección "El regalo perfecto tiene aroma" reusan el
// mismo evento `gentleman-co:filter-category` que ya usa GenderFinder — enlazan
// a categorías REALES del catálogo, no a productos inventados.
export const giftGuideCards = [
  { label: 'Para ella', category: 'dama' },
  { label: 'Para él', category: 'caballero' },
  { label: 'Para compartir', category: 'unisex' },
]
