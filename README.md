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

Para agregar más productos (nueva carga, categoría, promo, etc.): añadir
objetos al arreglo en `products.js` — `Catalog.jsx`, `ProductCard.jsx`, el
buscador y los filtros ya funcionan sobre cualquier tamaño de catálogo sin
tocarse. Carpetas `Desktop\DMPERFUMES` y `Desktop\perfumeria` son de otros
proyectos del cliente (marcas "DM Essence" y "Perfumes Peralta") — **no se
usaron**, confirmado explícitamente por el cliente.

## Estructura

```
src/
  components/   Header, Hero, Benefits, Catalog, ProductCard, ProductSpotlight,
                ProductModal, CraftProcess, FindYourFragrance, BrandSection,
                Location, Socials, FinalCTA, Footer, WhatsAppButton, LoadingScreen
  data/site.js      marca, WhatsApp, enlaces
  data/products.js  catálogo (48 productos), formatCOP, searchProducts
  hooks/            useReveal (scroll reveal con IntersectionObserver)
```
