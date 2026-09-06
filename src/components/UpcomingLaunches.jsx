import xerjoffAvif from '../assets/img/launch-xerjoff-torino21.avif'
import xerjoffWebp from '../assets/img/launch-xerjoff-torino21.webp'
import xerjoffJpg from '../assets/img/launch-xerjoff-torino21.jpg'
import eliviAvif from '../assets/img/launch-elivi-unstoppable-hong-kong.avif'
import eliviWebp from '../assets/img/launch-elivi-unstoppable-hong-kong.webp'
import eliviJpg from '../assets/img/launch-elivi-unstoppable-hong-kong.jpg'
import { upcomingLaunches, launchWaLink } from '../data/site'

// Tarjetas flotantes sobre la foto del hero anunciando lanzamientos que aún no
// tienen precio/stock — no son un producto real del catálogo todavía (ver
// [[feedback-no-inventar-catalogo]]), así que en vez de una ficha falsa, cada
// una abre WhatsApp para que el cliente pida que le avisen cuando lleguen.
// Fotos reales que mandó el cliente (Narciso + frasco de la marca de
// inspiración, mismo lenguaje visual que el resto del sitio).
const images = {
  Torino21: { avif: xerjoffAvif, webp: xerjoffWebp, jpg: xerjoffJpg },
  'Unstoppable Hong Kong': { avif: eliviAvif, webp: eliviWebp, jpg: eliviJpg },
}

// Ambas se mantienen en la franja superior de la imagen: apiladas a la
// izquierda en mobile/tablet (donde la imagen es más baja y el botón fijo de
// WhatsApp vive abajo a la derecha) y una a cada lado en desktop.
const positions = [
  'left-3 top-4 sm:left-5 sm:top-6 lg:left-8 lg:top-10 lg:right-auto',
  'left-3 top-32 sm:left-5 sm:top-36 lg:left-auto lg:right-8 lg:top-10',
]

export default function UpcomingLaunches() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {upcomingLaunches.map((item, i) => {
        const img = images[item.name]
        return (
          <a
            key={item.name}
            href={launchWaLink(item)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Próximamente: ${item.brand} ${item.name}. Escríbenos por WhatsApp para que te avisemos cuando llegue.`}
            className={`group pointer-events-auto absolute ${positions[i % positions.length]} flex w-24 animate-float flex-col items-center gap-1.5 rounded-2xl motion-reduce:animate-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 sm:w-28 lg:w-32`}
            style={{ animationDelay: `${i * 0.9}s` }}
          >
            <span className="relative block aspect-square w-full overflow-hidden rounded-2xl border-2 border-gold-300/60 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] transition-transform duration-200 group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
              <picture>
                <source srcSet={img.avif} type="image/avif" />
                <source srcSet={img.webp} type="image/webp" />
                <img
                  src={img.jpg}
                  alt=""
                  className="h-full w-full object-cover"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </picture>
              <span className="absolute -left-1 top-3 -rotate-[10deg] rounded-sm bg-gold-400 px-2 py-0.5 font-body text-[8px] font-semibold uppercase tracking-wide text-ink-900 shadow-md sm:text-[9px]">
                Próximamente
              </span>
            </span>
            <span className="block text-center font-display text-[11px] leading-tight text-cream-50 [text-shadow:0_1px_4px_rgba(0,0,0,0.8)] sm:text-xs">
              {item.brand} <span className="italic">{item.name}</span>
            </span>
          </a>
        )
      })}
    </div>
  )
}
