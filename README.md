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

- Todas las fotografías del sitio (`src/assets/img`) son recortes reales generados con `sharp` a partir de las fotografías/video originales de la marca en `source-material/` (`botella-oficial-ambiente.png`, foto real del frasco actual; `logo-oficial.png`, logo oficial real de la marca; `craft-poster-raw.jpg`, fotograma real extraído de uno de los videos de proceso). No se usó ninguna imagen genérica ni de bancos de imágenes. (`botella.png`, la foto original del frasco con tapa esférica, ya no se usa pero se deja en `source-material/` como referencia histórica.)
- La carpeta de origen (`Desktop\NARCISO`) no contenía un catálogo con nombres de fragancias individuales, precios ni categorías — solo una foto genérica del frasco insignia. Por eso el sitio presenta la marca y el frasco insignia real, y dirige cualquier consulta de catálogo/precio/disponibilidad a WhatsApp en vez de inventar datos.
- Las 4 imágenes "inspiracion*.png" de la carpeta de origen son fotografías de otras marcas de lujo (Parfums de Marly, Bond No. 9, Valentino, Tom Ford) — por decisión del cliente, **no se usaron** en el sitio.
- La carpeta también traía 3 videos reales de proceso — los 3 están en el sitio, en la sección "Hecho a mano" (`CraftProcess.jsx`), como galería con pestañas (El proceso / La fragancia / Nuestro taller), cada uno click-to-play con su propio fotograma real como poster (no autoplay, no bloquean la carga). El primero se recortó a los momentos clave (medir/mezclar y envasar, ~50s) y se comprimió de 39MB a ~2MB con `ffmpeg`; los otros dos ya eran cortos y se comprimieron a ~1.5-1.9MB cada uno. Se omitió deliberadamente el fragmento inicial del primer video que menciona el nombre de una fragancia de otra marca, para no hacer un señalamiento directo a un competidor en una web comercial permanente.
- El logo (`logo.png/webp`, `crown-mark.png/webp`, `favicon-32/180.png`) sale de `source-material/logo-oficial.png` — el logo oficial real de la marca (reemplazó a un `LOGO2.png` de menor calidad usado antes de que el cliente entregara el definitivo). Se procesa quitándole el fondo blanco original (chroma-key por luminancia en `scripts/optimize-images.mjs`, función `makeTransparent`) para que se vea limpio sobre cualquier fondo, claro u oscuro; `crown-mark` (el emblema de corona+laurel solo, sin la palabra "NARCISO") se recorta del 70% superior del logo — ese punto de corte se midió fila por fila sobre el PNG fuente para que caiga justo en el espacio entre el emblema y el texto. El logo oficial usa degradados/biseles dorados (no colores planos como el anterior), así que sus PNG/WebP se generan con paleta + compresión lossy de alta calidad en vez de lossless — mismo resultado visual, ~70% más liviano (importa especialmente en `crown-mark`, que carga en el primer paint de cada página vía la pantalla de carga).
- Número de WhatsApp: `3229282884`. Dirección: Urbanización Santa Ana, Manzana 34 Casa 2, Ibagué, Tolima.

## Catálogo (255 productos)

`src/data/products.js` es la única fuente de verdad del catálogo. Arranca con
el catálogo original — 24 fragancias "Perfumería Caballero" + 24 "Perfumería
Dama", con los nombres, precio ($60.000 COP c/u) y categoría exactos que dio
el cliente — y se amplió en agosto de 2026 (ver más abajo) con 207
fragancias adicionales (78 Caballero + 63 Dama + 66 Unisex), mismo precio
plano. **Todas comparten la misma foto real**
(`source-material/botella-oficial.png` → `catalog-bottle.*`): así se vende
realmente — un solo frasco/etiqueta, distinta esencia por dentro. No existen
fotos individuales por fragancia en el material entregado; si el cliente las
agrega más adelante, basta con cambiar el campo `image` de cada producto
(hoy vale `'catalog-bottle'` para los 255).

### Ampliación de catálogo (agosto 2026)

El cliente compartió una hoja de cálculo con 259 referencias de códigos
(DAMA/CABALLERO/UNISEX), muchas más que el catálogo de 48 ya existente.
Alcance confirmado explícitamente por el cliente: **solo agregar lo nuevo**
(no tocar los 48 originales) con **el mismo precio plano $60.000**.

Proceso seguido, por disciplina de no inventar datos:

1. **Deduplicación** contra el catálogo existente con un script de
   coincidencia difusa por tokens (normaliza texto, compara contra productos
   del mismo género) más revisión manual de los casos límite — de 259
   referencias, 50 ya estaban en el catálogo, 2 venían sin nombre (filas
   vacías, se descartaron) y 207 eran nuevas.
2. **Verificación de marca/título real** de las 207 referencias nuevas con 11
   agentes de investigación en paralelo (WebSearch) — el texto crudo del
   cliente venía abreviado o con errores de tipeo ("CK IN2U" → Calvin Klein,
   "Escada Sorbeto Roso" → Escada Sorbetto Rosso, etc.), así que cada marca y
   título se confirmó contra fuentes reales antes de publicarse. 195 de las
   207 se confirmaron sin ambigüedad. Las otras 12 no se pudieron confirmar
   con la misma certeza (marca sin producto especificado, como "Issey
   Miyake" o "Yves Saint Laurent" solos; nombres sin match real verificable,
   como "212 Gris NYC", "Creed Silver" o "ARRURU"; o casos ambiguos entre
   variantes, como "Paris Hilton Passport") — se avisó de esto al cliente
   antes de agregarlas, y el cliente confirmó explícitamente agregarlas
   igual ("agrega todos sin importar"), así que se agregaron usando el
   producto real más representativo de esa marca/línea en cada caso (ver los
   comentarios junto a cada una en `products.js`) — nunca un dato inventado
   de cero, sino la mejor coincidencia real disponible cuando el texto del
   cliente no alcanzaba para identificar un producto único.
3. Las 207 confirmadas se agregaron como tres arreglos nuevos en
   `products.js` (`caballeroAgosto2026`, `damaAgosto2026`, `unisex`) que se
   suman por spread al arreglo `products` final — el patrón de extensión que
   ya documentaba este archivo.
4. Como el catálogo nunca había tenido productos unisex reales, se agregó
   `CATEGORIES.UNISEX` y se conectó como una tercera categoría real en
   `Catalog.jsx` (filtro), `GenderFinder.jsx` (la tarjeta "Unisex" ahora
   filtra el catálogo en vivo en vez de ir directo a WhatsApp, y su foto
   pasó de un fotograma de video desactualizado —con la tapa esférica
   vieja— a `label-detail`, el mismo recorte real y actual que ya usa la
   ficha de producto) y `FindYourFragrance.jsx` (el quiz ahora ofrece
   Hombre/Mujer/Unisex).

**Nota importante:** la investigación profunda de perfil olfativo
(`fragranceInfo.js` — familia, notas de salida/corazón/fondo, ocasión,
estación) solo existe para los 48 productos originales. Los 207 productos
nuevos de agosto 2026 sí tienen `style` (Fresco/Dulce/Intenso/Elegante,
verificado igual que marca/título) para que funcionen en el quiz y los
filtros, pero su ficha individual muestra el texto genérico de respaldo
hasta que se investigue su perfil detallado — es un trabajo pendiente
distinto, no iniciado en esta ampliación.

La foto del frasco actual reemplazó a una foto anterior de estudio
(`botellabien.png`, ya no se usa pero se deja en `source-material/` por si
sirve de referencia) porque el cliente cambió la tapa física del frasco (de
tapa esférica a la tapa tipo rociador/pico que se ve hoy) y actualizó la
etiqueta al logo oficial. El cliente mandó **la misma foto en dos
versiones**, y el sitio usa AMBAS, cada una para lo que sirve mejor:

- **`botella-oficial.png`** — versión ya recortada por el cliente, con
  **canal alfa real** (fondo transparente de verdad, no solo visualmente
  negro). Se usa tal cual (`sharp(bottleOficialSrc).trim()`, sin ninguna
  técnica de recorte) para `catalog-bottle.*` — el frasco solo, sobre las
  tarjetas del catálogo y "también podría gustarte".
- **`botella-oficial-ambiente.png`** — la foto de ambiente original (mismo
  frasco, mostrador de madera y estantería de botellas desenfocada de
  fondo, sin recortar). Se usa para `hero-bottle.*`, `spotlight-bottle.*`,
  `label-detail.*` (los recortes reales de la ficha de producto y la
  sección "Nuestra Fragancia") y `og-image.jpg` — ahí es donde tiene
  sentido mostrar el fondo real, no un recorte transparente.

(Antes de que llegara la versión recortada, se llegó a probar tanto
flood-fill como una silueta trazada a mano sobre la foto de ambiente —
medida con un escaneo de luminancia píxel por píxel en la zona del
rociador, traslúcido/reflectante y sin borde definido — pero quedó obsoleto
en cuanto el cliente subió la versión con alfa real.) `removeStudioBackground()`
(flood-fill) queda sin uso en el script por si el cliente manda una foto de
estudio con fondo plano a futuro.

El catálogo se agrupa en tres secciones (Perfumería Caballero / Perfumería
Dama / Perfumería Unisex, cada una con su encabezado) y cada sección es un **carrusel horizontal**
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
  fotografía real). Las 3 filtran el catálogo en vivo (evento
  `narciso:filter-category` que Catalog.jsx escucha). Unisex era WhatsApp-only
  originalmente porque no existían productos unisex reales en el catálogo —
  pasó a filtro real en la ampliación de agosto 2026, ver arriba.
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

Cada uno de los 255 perfumes del catálogo tiene su propia página
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

## Carrito de compras y checkout

`src/context/CartContext.jsx` es el estado global del carrito (React
Context + `useReducer`, sin librerías externas), persistido en
`localStorage` (`narciso-cart-v1`) con una bandera `hydrated` para evitar
que StrictMode borre el carrito guardado al montar dos veces en desarrollo
(ver [[feedback_carrito_localstorage_strictmode]]). Se agrega desde la
tarjeta del catálogo (`ProductCard.jsx`) o la ficha individual
(`ProductDetailPage.jsx`) — ambas mantienen intacto el botón directo de
"Comprar por WhatsApp" ya existente; el carrito es una vía adicional, no un
reemplazo.

- **`CartDrawer.jsx`** — panel lateral desde la derecha (overlay +
  `backdrop-blur`, trampa de foco, Escape para cerrar, igual que
  `ProductModal.jsx`). Estado vacío ilustrado con botón a `/#catalogo`.
- **`CartItemRow.jsx`** — selector de cantidad, subtotal en vivo, y
  eliminación (manual o automática al llegar a 0) con una animación de
  salida antes de quitar la línea.
- **`CheckoutModal.jsx`** — formulario (nombre, teléfono, ciudad,
  dirección, barrio, indicaciones, método de pago) con validación de
  campos obligatorios y resumen del pedido.
- **`data/cart.js`** (`buildOrderMessage`) — arma el mensaje estructurado
  de WhatsApp al confirmar; se abre `wa.me/3229282884` y el carrito se
  vacía tras el envío.
- **Tamaños/presentaciones**: la arquitectura ya soporta `product.sizes`
  (cada producto podría tener 30/50/100 ML a precios distintos como
  líneas separadas en el carrito), pero como los 48 productos reales de
  hoy venden una sola presentación a $60.000, no se inventó ningún
  selector de tallas — sencillamente no aparece hasta que el cliente
  tenga tallas reales que cargar en `products.js`.

## Estructura

```
src/
  components/   Header, Hero, GenderFinder, Catalog, ProductCard, ProductRow,
                WhyNarciso, ProductSpotlight, ProductModal, CraftProcess,
                Experience, FindYourFragrance, BrandSection, Location,
                Socials, FinalCTA, Footer, WhatsAppButton, LoadingScreen,
                Breadcrumbs, CartDrawer, CartItemRow, CartToast, CheckoutModal
  context/CartContext.jsx  estado global del carrito (persistido en localStorage)
  pages/            HomePage, ProductDetailPage (ficha individual /perfumes/:slug)
  data/site.js      marca, WhatsApp, enlaces
  data/cart.js      buildOrderMessage (mensaje de pedido estructurado para WhatsApp)
  data/products.js  catálogo (255 productos), formatCOP, searchProducts,
                    getProductById, getRelatedProducts
  data/fragranceInfo.js  perfil olfativo real investigado por fragancia (solo
                    los 48 productos originales, ver Ampliación agosto 2026)
  hooks/            useReveal (scroll reveal), useDocumentMeta (SEO por página)
```
