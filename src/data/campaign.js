// Interruptor de la campaña visual de Halloween ("Halloween Edition") — capa
// puramente estética sobre la identidad real de Gentleman Co (NO toca
// catálogo, precios, notas, contacto ni funcionalidades). Sustituye a la
// campaña de San Valentín. La paleta vive en tailwind.config.js e index.css;
// con esta bandera en `false` desaparece de un solo lugar la ambientación
// (escena nocturna del hero, luna, murciélagos, arañas, telarañas, velas,
// calabazas, niebla, brasas, rótulos y secciones de temporada).
export const HALLOWEEN_ACTIVE = true

// Solo rótulos de campaña. Los textos comerciales (hero, catálogo, botones,
// fichas) no cambian: aquí viven únicamente las líneas que antes decían
// "San Valentín" o hablaban de amor.
export const halloweenCopy = {
  // Barra superior: [rótulo de campaña, lema de la marca].
  promoBar: ['Halloween Edition', 'Fragancias que dejan huella'],
  heroEyebrow: 'Halloween Edition',
  heroLine: 'Una noche. Una fragancia.',
  catalogEyebrow: 'Halloween Edition',
  catalogLine: 'Aromas con carácter para la noche más oscura del año',
  giftBadge: 'Ideal para regalar',
  giftGuideEyebrow: 'Halloween Edition',
  giftGuideTitle: 'El regalo perfecto tiene aroma',
  giftGuideLine: 'Encuentra la fragancia ideal para cada persona especial.',
  promoImageAlt: 'Promoción especial Gentleman Co: elige 3 fragancias por $130.000 COP',
  footerNote: 'Feliz Halloween · Gentleman Co.',
}

// Las 3 tarjetas de la sección "El regalo perfecto tiene aroma" reusan el
// mismo evento `gentleman-co:filter-category` que ya usa GenderFinder — enlazan
// a categorías REALES del catálogo, no a productos inventados.
export const giftGuideCards = [
  { label: 'Para ella', category: 'dama' },
  { label: 'Para él', category: 'caballero' },
  { label: 'Para compartir', category: 'unisex' },
]
