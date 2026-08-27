# Narciso Parfum

Sitio web de marca para **Narciso Parfum** (perfumería inspirada de alta calidad, Ibagué, Tolima). React + Vite + Tailwind CSS, orientado 100% a conversión por WhatsApp.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:5264
npm run build     # build de producción en /dist
npm run optimize-images   # regenera src/assets/img a partir de source-material/
```

## Notas de contenido

- Todas las fotografías del sitio (`src/assets/img`) son recortes reales generados con `sharp` a partir de las fotografías/video originales de la marca en `source-material/` (`botella.png`, foto real del frasco; `LOGO2.png`, logo vectorial real; `craft-poster-raw.jpg`, fotograma real extraído de uno de los videos de proceso). No se usó ninguna imagen genérica ni de bancos de imágenes.
- La carpeta de origen (`Desktop\NARCISO`) no contenía un catálogo con nombres de fragancias individuales, precios ni categorías — solo una foto genérica del frasco insignia. Por eso el sitio presenta la marca y el frasco insignia real, y dirige cualquier consulta de catálogo/precio/disponibilidad a WhatsApp en vez de inventar datos.
- Las 4 imágenes "inspiracion*.png" de la carpeta de origen son fotografías de otras marcas de lujo (Parfums de Marly, Bond No. 9, Valentino, Tom Ford) — por decisión del cliente, **no se usaron** en el sitio.
- La carpeta también traía 3 videos reales de proceso — los 3 están en el sitio, en la sección "Hecho a mano" (`CraftProcess.jsx`), como galería con pestañas (El proceso / La fragancia / Nuestro taller), cada uno click-to-play con su propio fotograma real como poster (no autoplay, no bloquean la carga). El primero se recortó a los momentos clave (medir/mezclar y envasar, ~50s) y se comprimió de 39MB a ~2MB con `ffmpeg`; los otros dos ya eran cortos y se comprimieron a ~1.5-1.9MB cada uno. Se omitió deliberadamente el fragmento inicial del primer video que menciona el nombre de una fragancia de otra marca, para no hacer un señalamiento directo a un competidor en una web comercial permanente.
- El logo (`logo.png/webp`, `crown-mark.png/webp`) se procesa quitándole el fondo blanco original (chroma-key por luminancia en `scripts/optimize-images.mjs`, función `makeTransparent`) para que se vea limpio sobre cualquier fondo, claro u oscuro.
- Número de WhatsApp: `3229282884`. Dirección: Urbanización Santa Ana, Manzana 34 Casa 2, Ibagué, Tolima.

## Catálogo (48 productos)

`src/data/products.js` es la única fuente de verdad del catálogo — 24 fragancias
"Perfumería Caballero" + 24 "Perfumería Dama", con los nombres, precio
($60.000 COP c/u) y categoría exactos que dio el cliente. **Todas comparten la
misma foto real** (`source-material/botellabien.png` → `catalog-bottle.*`):
así se vende realmente — un solo frasco/etiqueta, distinta esencia por dentro.
No existen fotos individuales por fragancia en el material entregado; si el
cliente las agrega más adelante, basta con cambiar el campo `image` de cada
producto (hoy vale `'catalog-bottle'` para los 48).

El catálogo se agrupa en dos secciones (Perfumería Caballero / Perfumería
Dama, cada una con su encabezado) y cada sección es un **carrusel horizontal**
(`ProductRow.jsx` + `ProductCard.jsx`, tema oscuro ink-900/gold, flecha de
scroll en desktop, swipe en móvil) — sin numeración, sin scroll vertical
largo.

Para agregar más productos (nueva carga, categoría, promo, etc.): añadir
objetos al arreglo en `products.js` — `Catalog.jsx`, `ProductCard.jsx`, el
buscador y los filtros ya funcionan sobre cualquier tamaño de catálogo sin
tocarse. Carpetas `Desktop\DMPERFUMES` y `Desktop\perfumeria` son de otros
proyectos del cliente (marcas "DM Essence" y "Perfumes Peralta") — **no se
usaron**, confirmado explícitamente por el cliente.

## Rediseño editorial (referencia externa)

El cliente pasó capturas de una tienda de perfumería ajena como **referencia de
principios de diseño** (espaciado editorial, tarjetas grandes, jerarquía
tipográfica) — explícitamente NO para copiar su marca/logo/textos/colores.
Cambios aplicados, todos con datos y fotos reales de Narciso:

- **Hero**: pasó a una tarjeta oscura de esquinas redondeadas con margen
  (estilo "inset card"), pills de beneficios reales, y una fila de confianza
  con hechos verificados (Ibagué/Tolima, atención personalizada). No se
  agregaron rating ni cifras de clientes ni envíos nacionales — no hay dato
  real que lo respalde.
- **`GenderFinder.jsx`** ("Tu fragancia empieza aquí"): 3 tarjetas grandes
  Hombre/Mujer/Unisex con fotos reales (recortes distintos de la misma
  fotografía real). Hombre/Mujer filtran el catálogo en vivo (evento
  `narciso:filter-category` que Catalog.jsx escucha); Unisex va directo a
  WhatsApp porque no existen productos unisex reales en el catálogo — no se
  inventó ninguno.
- **`WhyNarciso.jsx`** ("¿Por qué Narciso?", reemplaza a `Benefits.jsx`):
  checklist con los 6 hechos reales confirmados por el cliente.
- **`Experience.jsx`** ("Tu aroma. Tu presencia."): foto real (fotograma del
  video "La fragancia") en tarjeta oscura grande.
- **`FindYourFragrance.jsx`** ahora es un mini-quiz de 2 pasos (género +
  estilo olfativo) que muestra hasta 4 productos reales del catálogo que
  calzan. El campo `style` en `products.js` (Fresco/Dulce/Intenso/Elegante)
  es una clasificación orientativa de conocimiento público sobre estas
  fragancias reales — no una característica inventada del producto ni un dato
  provisto por el cliente.

## Fichas individuales de producto (`/perfumes/:slug`)

Cada uno de los 48 perfumes del catálogo tiene su propia página
(`src/pages/ProductDetailPage.jsx`, un solo componente reutilizable
alimentado por `product.id` vía `react-router-dom`) con breadcrumbs, galería
(reutiliza las fotos reales ya existentes del sitio), precio, CTA de
WhatsApp con mensaje específico del producto, perfil olfativo (salida /
corazón / fondo), "¿cuándo usarlo?" y una sección "también podría gustarte"
con hasta 4 productos reales relacionados (`getRelatedProducts` en
`products.js`: prioriza mismo género, luego mismo estilo/marca — nunca
mezcla Caballero/Dama ni recomienda al azar).

**Investigación real por fragancia** (`src/data/fragranceInfo.js`): familia
olfativa, notas de salida/corazón/fondo, año de lanzamiento, concentración,
ocasión, estación y momento del día para cada una de las 48 fragancias en
las que Narciso se inspira, investigados con búsqueda web contra fuentes
públicas (Fragrantica, Basenotes, sitios oficiales de cada marca, retailers
establecidos como Sephora/Douglas) mediante un workflow de 8 agentes en
paralelo. Reglas seguidas estrictamente:

- **Nunca se muestra un dato que no se pudo verificar.** De 48 fragancias,
  47 tienen ficha completa. La única excepción es **"Good Girl Glam" de
  Carolina Herrera** (dama): no existe un producto con ese nombre exacto en
  el catálogo oficial de la marca ni en las bases de datos consultadas (el
  producto real más cercano es "Very Good Girl Glam", de la línea "Very Good
  Girl", distinta a "Good Girl") — para no arriesgar un dato falso, esa
  ficha no muestra familia/notas/ocasión y usa el texto genérico de
  respaldo. Sigue teniendo precio, WhatsApp y productos relacionados
  normalmente.
- **Nunca se afirma una duración exacta** ("dura 12 horas") — no se incluyó
  ningún dato de rendimiento/duración por marca por no encontrarse fuentes
  confiables y consistentes entre sí para las 47 fragancias verificadas.
- **"Inspirado en [marca]" en todas partes**, nunca se implica que Narciso
  vende el producto original — el texto de descripción, los `<meta>` y el
  JSON-LD describen siempre el perfil de la fragancia en la que Narciso se
  inspira, no el producto de la marca original. No se usa ningún logo de
  marca ajena.
- El campo `profile` ("¿A qué huele?") de cada ficha es un texto corto
  escrito a partir de las notas investigadas — no una plantilla genérica
  repetida: cada una de las 47 fichas tiene su propia redacción.

**SEO por página** (`src/hooks/useDocumentMeta.js`, sin dependencias): título,
meta description, Open Graph, canonical y JSON-LD (`schema.org/Product`) se
generan automáticamente a partir de los datos del producto y se limpian al
salir de la página. Es una solución client-side (esta es una SPA, no
SSR/prerender) — funciona para compartir enlaces y para crawlers que
ejecutan JS; si en el futuro se necesita SEO a nivel de servidor habría que
migrar a Next.js o añadir prerender.

`vercel.json` incluye un rewrite catch-all a `index.html` para que
`/perfumes/<slug>` funcione al entrar directo o recargar (necesario para
cualquier host estático con `react-router-dom` en modo `BrowserRouter`).

## Estructura

```
src/
  components/   Header, Hero, GenderFinder, Catalog, ProductCard, ProductRow,
                WhyNarciso, ProductSpotlight, ProductModal, CraftProcess,
                Experience, FindYourFragrance, BrandSection, Location,
                Socials, FinalCTA, Footer, WhatsAppButton, LoadingScreen,
                Breadcrumbs
  pages/            HomePage, ProductDetailPage (ficha individual /perfumes/:slug)
  data/site.js      marca, WhatsApp, enlaces
  data/products.js  catálogo (48 productos), formatCOP, searchProducts,
                    getProductById, getRelatedProducts
  data/fragranceInfo.js  perfil olfativo real investigado por fragancia
  hooks/            useReveal (scroll reveal), useDocumentMeta (SEO por página)
```
