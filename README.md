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

- Todas las fotografías del sitio (`src/assets/img`) son recortes reales generados con `sharp` a partir de las 2 fotografías originales de la marca en `source-material/` (`botella.png`, foto real del frasco; `LOGO2.png`, logo vectorial real). No se usó ninguna imagen genérica ni de bancos de imágenes.
- La carpeta de origen (`Desktop\NARCISO`) no contenía un catálogo con nombres de fragancias individuales, precios ni categorías — solo una foto genérica del frasco insignia. Por eso el sitio presenta la marca y el frasco insignia real, y dirige cualquier consulta de catálogo/precio/disponibilidad a WhatsApp en vez de inventar datos.
- Las 4 imágenes "inspiracion*.png" de la carpeta de origen son fotografías de otras marcas de lujo (Parfums de Marly, Bond No. 9, Valentino, Tom Ford) — por decisión del cliente, **no se usaron** en el sitio.
- Número de WhatsApp: `3229282884`. Dirección: Urbanización Santa Ana, Manzana 34 Casa 2, Ibagué, Tolima.

## Estructura

```
src/
  components/   Header, Hero, Benefits, ProductSpotlight, ProductModal,
                FindYourFragrance, BrandSection, Location, Socials,
                FinalCTA, Footer, WhatsAppButton, LoadingScreen
  data/site.js  única fuente de verdad (marca, WhatsApp, enlaces)
  hooks/        useReveal (scroll reveal con IntersectionObserver)
```
