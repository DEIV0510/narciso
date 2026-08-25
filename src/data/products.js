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

const caballero = [
  { title: 'King of Seduction', brand: 'Antonio Banderas' },
  { title: 'Acqua di Gio Parfum', brand: 'Giorgio Armani' },
  { title: 'Blue Seduction', brand: 'Antonio Banderas' },
  { title: 'Acqua di Gio', brand: 'Giorgio Armani' },
  { title: 'Armani Code EDT', brand: 'Giorgio Armani' },
  { title: 'Stronger With You Tobacco', brand: 'Giorgio Armani' },
  { title: 'Stronger With You Intensely', brand: 'Giorgio Armani' },
  { title: 'Acqua di Gio Profumo', brand: 'Giorgio Armani' },
  { title: 'Aqva Pour Homme', brand: 'Bvlgari' },
  { title: 'Burberry Hero EDP', brand: 'Burberry' },
  { title: 'Man in Black', brand: 'Bvlgari' },
  { title: 'Bvlgari Man', brand: 'Bvlgari' },
  { title: '212 Sexy Men', brand: 'Carolina Herrera' },
  { title: 'Euphoria', brand: 'Calvin Klein' },
  { title: 'Eternity', brand: 'Calvin Klein' },
  { title: '212 NYC', brand: 'Carolina Herrera' },
  { title: '212 VIP Black Red', brand: 'Carolina Herrera' },
  { title: '212 VIP Black Extra', brand: 'Carolina Herrera' },
  { title: '212 VIP Black', brand: 'Carolina Herrera' },
  { title: '212 VIP Black I Love NY', brand: 'Carolina Herrera' },
  { title: '212 VIP', brand: 'Carolina Herrera' },
  { title: 'Réserve Privée', brand: 'Givenchy' },
  { title: 'Sauvage EDT', brand: 'Dior' },
  { title: 'CH Privé EDT', brand: 'Carolina Herrera' },
].map((p) => toProduct(p, CATEGORIES.CABALLERO, 'hombre'))

const dama = [
  { title: 'Sì EDP Intensely', brand: 'Giorgio Armani' },
  { title: 'Thank U, Next', brand: 'Ariana Grande' },
  { title: 'Ari', brand: 'Ariana Grande' },
  { title: 'Acqua di Gioia', brand: 'Giorgio Armani' },
  { title: 'Mod Vanilla', brand: 'Ariana Grande' },
  { title: 'Cloud Pink', brand: 'Ariana Grande' },
  { title: 'Her Elixir', brand: 'Burberry' },
  { title: 'Miss Dior Parfum', brand: 'Dior' },
  { title: 'Her EDP', brand: 'Burberry' },
  { title: 'Euphoria', brand: 'Calvin Klein' },
  { title: '212 Sexy', brand: 'Carolina Herrera' },
  { title: 'Sweet Candy', brand: 'Ariana Grande' },
  { title: 'Sì', brand: 'Giorgio Armani' },
  { title: 'Good Girl Blush', brand: 'Carolina Herrera' },
  { title: '212 VIP', brand: 'Carolina Herrera' },
  { title: '212 VIP Rosé', brand: 'Carolina Herrera' },
  { title: 'Good Girl Glam', brand: 'Carolina Herrera' },
  { title: 'Chance Eau Fraîche', brand: 'Chanel' },
  { title: 'La Bomba', brand: 'Carolina Herrera' },
  { title: 'Good Girl Blush Elixir', brand: 'Carolina Herrera' },
  { title: 'Miss Dior Blooming Bouquet', brand: 'Dior' },
  { title: 'Chance', brand: 'Chanel' },
  { title: 'CH Sublime', brand: 'Carolina Herrera' },
  { title: 'Libre', brand: 'YSL' },
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

function toProduct({ title, brand }, category, gender) {
  return {
    id: slugify(title, brand, gender),
    title,
    brand,
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
