import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'
import { IconFlame } from './icons'

// Barra angosta de campaña, debajo del header en toda la página (montada una
// sola vez en App.jsx). Texto en bucle horizontal muy lento y decorativo —
// aria-hidden porque es un adorno repetitivo, no información nueva. Cada mitad
// repite el rótulo 3 veces para que siempre cubra el ancho de pantallas
// grandes; con prefers-reduced-motion queda una sola línea centrada y estática
// (sin overflow horizontal).
function Item({ hideOnReduce = false }) {
  return (
    <span
      className={`flex shrink-0 items-center gap-2 px-6 font-body text-[11px] uppercase tracking-widest2 text-gold-200 ${
        hideOnReduce ? 'motion-reduce:hidden' : ''
      }`}
    >
      <IconFlame className="h-3 w-3 text-ember-400" />
      {halloweenCopy.promoBar}
    </span>
  )
}

function Group({ hideOnReduce = false }) {
  return (
    <div className={`flex shrink-0 ${hideOnReduce ? 'motion-reduce:hidden' : ''}`}>
      <Item />
      <Item hideOnReduce />
      <Item hideOnReduce />
    </div>
  )
}

export default function HalloweenPromoBar() {
  if (!HALLOWEEN_ACTIVE) return null

  return (
    <div className="overflow-hidden border-b border-gold-500/15 bg-night-950 py-2" aria-hidden="true">
      <div className="flex w-max motion-safe:animate-[marquee_44s_linear_infinite] motion-reduce:w-full motion-reduce:justify-center">
        <Group />
        <Group hideOnReduce />
      </div>
    </div>
  )
}
