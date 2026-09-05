// Única fuente de verdad para los datos reales de la marca.
// No se inventan precios, nombres de fragancias ni categorías: solo se usa
// la información que existe realmente (etiqueta del frasco, logo, datos de contacto).

export const brand = {
  name: 'Narciso Parfum',
  tagline: 'Perfumería de alta calidad',
  subtagline: 'Perfumería inspirada para quienes quieren dejar huella.',
  specialists: 'Especialistas en inspiración',
  city: 'Ibagué, Tolima',
  whatsapp: '573229282884',
  whatsappDisplay: '322 928 2884',
  instagramUrl:
    'https://www.instagram.com/narcisoparfumoficial?igsi=MWFndjc4ZWs1N3J6dA%3D%3D&utm_source=qr',
  instagramHandle: '@narcisoparfumoficial',
  tiktokUrl: 'https://www.tiktok.com/@narciso.parfum.of?_r=1&_t=ZS-996dMDNbOGi',
  tiktokHandle: '@narciso.parfum.of',
  address: {
    line1: 'Urbanización Santa Ana, Manzana 34 Casa 2',
    line2: 'Ibagué, Tolima, Colombia',
    full: 'Urbanización Santa Ana, Manzana 34 Casa 2, Ibagué, Tolima, Colombia',
  },
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  brand.address.full
)}`

export function waLink(message) {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  catalog: 'Hola, Narciso Parfum. Quiero conocer su catálogo de fragancias y precios.',
  product:
    'Hola, Narciso Parfum. Estoy interesado/a en el perfume Narciso Parfum. ¿Me pueden dar información y precio?',
  feminine:
    'Hola, Narciso Parfum. Estoy buscando una fragancia femenina. ¿Me pueden recomendar opciones y precios?',
  masculine:
    'Hola, Narciso Parfum. Estoy buscando una fragancia masculina. ¿Me pueden recomendar opciones y precios?',
  unisex:
    'Hola, Narciso Parfum. Estoy buscando una fragancia unisex. ¿Me pueden recomendar opciones y precios?',
  availability: 'Hola, Narciso Parfum. Quiero consultar disponibilidad de sus fragancias.',
  order: 'Hola, Narciso Parfum. Quiero hacer mi pedido. ¿Me ayudan con el proceso?',
}

// Próximos lanzamientos anunciados por el cliente (aún sin precio/stock, no son
// parte del catálogo real todavía — ver [[feedback-no-inventar-catalogo]]). Se
// muestran como adelanto ("Próximamente") con un mensaje de WhatsApp para que
// el cliente avise cuando lleguen, en vez de crear una ficha de producto falsa.
export const upcomingLaunches = [
  { brand: 'Xerjoff', name: 'Torino21', category: 'Caballero' },
  { brand: 'Elivi Parfums', name: 'Unstoppable Hong Kong', category: 'Caballero' },
]

export function launchWaLink(item) {
  return waLink(
    `Hola, Narciso Parfum. Vi que próximamente llega ${item.brand} ${item.name}. ¿Me avisan cuando esté disponible?`
  )
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nuestra Fragancia', href: '#fragancia' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Encuentra tu Aroma', href: '#encuentra' },
  { label: 'Ubicación', href: '#ubicacion' },
]

export const whyNarciso = [
  'Perfumería de alta calidad',
  'Perfumería inspirada',
  'Presentación premium',
  'Atención personalizada',
  'Compra fácil por WhatsApp',
  'Elaborado en Ibagué, Tolima',
]
