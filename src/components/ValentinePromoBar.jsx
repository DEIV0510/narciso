import { VALENTINES_ACTIVE, valentinesCopy } from '../data/campaign'
import { IconHeart } from './icons'

// Barra angosta de campaña, debajo del header en toda la página (montada una
// sola vez en App.jsx). Texto en bucle horizontal muy lento y decorativo —
// aria-hidden porque es un adorno repetitivo, no información nueva. Con
// prefers-reduced-motion se oculta la copia duplicada y queda una sola línea
// centrada y estática (sin overflow horizontal).
function Item({ duplicate = false }) {
  return (
    <span
      className={`flex shrink-0 items-center gap-2 px-6 font-body text-[11px] uppercase tracking-widest2 text-gold-200 ${
        duplicate ? 'motion-reduce:hidden' : ''
      }`}
    >
      <IconHeart className="h-3 w-3 text-wine-300" />
      {valentinesCopy.promoBar}
    </span>
  )
}

export default function ValentinePromoBar() {
  if (!VALENTINES_ACTIVE) return null

  return (
    <div className="overflow-hidden border-b border-wine-800/60 bg-ink-900 py-2" aria-hidden="true">
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:w-full motion-reduce:justify-center">
        <Item />
        <Item duplicate />
      </div>
    </div>
  )
}
