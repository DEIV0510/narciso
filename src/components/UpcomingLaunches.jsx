import { upcomingLaunches, launchWaLink } from '../data/site'
import { IconSparkle } from './icons'

// Insignias flotantes sobre la foto del hero anunciando lanzamientos que aún no
// tienen precio/stock — no son un producto real del catálogo todavía (ver
// [[feedback-no-inventar-catalogo]]), así que en vez de una ficha falsa, cada
// una abre WhatsApp para que el cliente pida que le avisen cuando lleguen.
// Ambas se mantienen en la franja superior de la imagen: apiladas a la
// izquierda en mobile/tablet (donde la imagen es más baja y el botón fijo de
// WhatsApp vive abajo a la derecha) y una a cada lado en desktop.
const positions = [
  'left-3 top-4 sm:left-5 sm:top-6 lg:left-8 lg:top-10 lg:right-auto',
  'left-3 top-20 sm:left-5 sm:top-24 lg:left-auto lg:right-8 lg:top-10',
]

export default function UpcomingLaunches() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {upcomingLaunches.map((item, i) => (
        <a
          key={item.name}
          href={launchWaLink(item)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Próximamente: ${item.brand} ${item.name}. Escríbenos por WhatsApp para que te avisemos cuando llegue.`}
          className={`pointer-events-auto absolute ${positions[i % positions.length]} max-w-[10.5rem] animate-float motion-reduce:animate-none flex items-center gap-2 rounded-2xl border border-gold-300/40 bg-ink-900/70 py-2 pl-2.5 pr-3 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-gold-300/70 hover:bg-ink-900/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300 sm:max-w-[13rem] lg:max-w-[15rem]`}
          style={{ animationDelay: `${i * 0.9}s` }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300">
            <IconSparkle className="h-4 w-4" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-body text-[9px] uppercase tracking-widest2 text-gold-300">
              Próximamente
            </span>
            <span className="block break-words font-display text-[13px] text-cream-50 sm:text-sm">
              {item.brand} <span className="italic">{item.name}</span>
            </span>
          </span>
        </a>
      ))}
    </div>
  )
}
