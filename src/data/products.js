// Catálogo real de Narciso Parfum. Datos provistos por el cliente — no se
// inventan nombres, precios ni categorías. Todas las fragancias comparten el
// mismo frasco/etiqueta real (foto de source-material/botellabien.png), tal
// como se venden realmente: mismo envase, distinta esencia por dentro.
//
// Para agregar más productos en el futuro: solo hace falta añadir un objeto
// más a este arreglo (o crear un nuevo arreglo y hacer spread en `products`
// más abajo). No hay que tocar ningún componente.

export const CATEGORIES = {
  CABALLERO: 'Perfumería Caballero',
  DAMA: 'Perfumería Dama',
}

// `style` = familia olfativa general (Fresco / Dulce / Intenso / Elegante),
// solo para agrupar en el buscador de fragancias — es una clasificación
// orientativa de conocimiento público sobre estas fragancias reales, no un
// dato provisto por el cliente ni una característica inventada del producto.
const caballero = [
  { title: 'King of Seduction', brand: 'Antonio Banderas', style: 'Dulce' },
  { title: 'Acqua di Gio Parfum', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Blue Seduction', brand: 'Antonio Banderas', style: 'Fresco' },
  { title: 'Acqua di Gio', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Armani Code EDT', brand: 'Giorgio Armani', style: 'Elegante' },
  { title: 'Stronger With You Tobacco', brand: 'Giorgio Armani', style: 'Intenso' },
  { title: 'Stronger With You Intensely', brand: 'Giorgio Armani', style: 'Intenso' },
  { title: 'Acqua di Gio Profumo', brand: 'Giorgio Armani', style: 'Elegante' },
  { title: 'Aqva Pour Homme', brand: 'Bvlgari', style: 'Fresco' },
  { title: 'Burberry Hero EDP', brand: 'Burberry', style: 'Intenso' },
  { title: 'Man in Black', brand: 'Bvlgari', style: 'Intenso' },
  { title: 'Bvlgari Man', brand: 'Bvlgari', style: 'Elegante' },
  { title: '212 Sexy Men', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Euphoria', brand: 'Calvin Klein', style: 'Intenso' },
  { title: 'Eternity', brand: 'Calvin Klein', style: 'Elegante' },
  { title: '212 NYC', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: '212 VIP Black Red', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black Extra', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP Black I Love NY', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: '212 VIP', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Réserve Privée', brand: 'Givenchy', style: 'Elegante' },
  { title: 'Sauvage EDT', brand: 'Dior', style: 'Fresco' },
  { title: 'CH Privé EDT', brand: 'Carolina Herrera', style: 'Elegante' },
].map((p) => toProduct(p, CATEGORIES.CABALLERO, 'hombre'))

const dama = [
  { title: 'Sì EDP Intensely', brand: 'Giorgio Armani', style: 'Dulce' },
  { title: 'Thank U, Next', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Ari', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Acqua di Gioia', brand: 'Giorgio Armani', style: 'Fresco' },
  { title: 'Mod Vanilla', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Cloud Pink', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Her Elixir', brand: 'Burberry', style: 'Intenso' },
  { title: 'Miss Dior Parfum', brand: 'Dior', style: 'Elegante' },
  { title: 'Her EDP', brand: 'Burberry', style: 'Dulce' },
  { title: 'Euphoria', brand: 'Calvin Klein', style: 'Intenso' },
  { title: '212 Sexy', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Sweet Candy', brand: 'Ariana Grande', style: 'Dulce' },
  { title: 'Sì', brand: 'Giorgio Armani', style: 'Dulce' },
  { title: 'Good Girl Blush', brand: 'Carolina Herrera', style: 'Dulce' },
  { title: '212 VIP', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: '212 VIP Rosé', brand: 'Carolina Herrera', style: 'Fresco' },
  { title: 'Good Girl Glam', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'Chance Eau Fraîche', brand: 'Chanel', style: 'Fresco' },
  { title: 'La Bomba', brand: 'Carolina Herrera', style: 'Elegante' },
  { title: 'Good Girl Blush Elixir', brand: 'Carolina Herrera', style: 'Intenso' },
  { title: 'Miss Dior Blooming Bouquet', brand: 'Dior', style: 'Fresco' },
  { title: 'Chance', brand: 'Chanel', style: 'Elegante' },
  { title: 'CH Sublime', brand: 'Carolina Herrera', style: 'Elegante' },
  { title: 'Libre', brand: 'YSL', style: 'Elegante' },
].map((p) => toProduct(p, CATEGORIES.DAMA, 'mujer'))

function slugify(...parts) {
  return parts
    .join('-')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function toProduct({ title, brand, style }, category, gender) {
  return {
    id: slugify(title, brand, gender),
    title,
    brand,
    style,
    fullName: `${title} by ${brand}`,
    price: 60000,
    category,
    gender,
    // Foto real (source-material/botellabien.png): mismo frasco/etiqueta para
    // toda la colección, tal como se vende realmente. Si en el futuro hay
    // fotos individuales por fragancia, basta con cambiar este campo.
    image: 'catalog-bottle',
  }
}

// Se agregan nuevas cargas de catálogo haciendo spread aquí.
export const products = [...caballero, ...dama]

export const brands = [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b, 'es'))

export function formatCOP(amount) {
  return `$${amount.toLocaleString('es-CO')} COP`
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

export function searchProducts(list, query) {
  const q = normalize(query.trim())
  if (!q) return list
  return list.filter((p) => normalize(`${p.title} ${p.brand} ${p.fullName}`).includes(q))
}
