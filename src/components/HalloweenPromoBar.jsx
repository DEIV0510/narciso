import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'
import { IconPumpkin, IconBat, IconMoon } from './icons'

// Barra superior de campaña, encima del header (montada una sola vez en
// App.jsx; se va con el scroll y el header queda fijo). Texto en bucle
// horizontal muy lento y decorativo — aria-hidden porque es un adorno
// repetitivo, no información nueva. Cada mitad repite el rótulo 3 veces para
// cubrir pantallas grandes; con prefers-reduced-motion queda una sola línea
// centrada y estática (sin overflow horizontal).
// `data-hw-observe`: usePauseOffscreen pausa la marquesina cuando la barra
// queda fuera de pantalla (medido: lejos del viewport Chrome la anima en el
// hilo principal, ~125 recálculos de estilo/s al fondo de la página).
function Item({ hideOnReduce = false }) {
  const [edition, motto] = halloweenCopy.promoBar
  return (
    <span
      className={`flex shrink-0 items-center gap-3 px-5 font-body text-[11px] uppercase tracking-widest2 ${
        hideOnReduce ? 'motion-reduce:hidden' : ''
      }`}
    >
      <IconPumpkin className="h-3.5 w-3.5 text-ember-500 [filter:drop-shadow(0_0_4px_rgba(255,106,0,0.8))]" />
      <span className="font-medium text-ember-400">{edition}</span>
      <IconMoon className="h-3 w-3 text-gold-400" />
      <span className="text-gold-200">{motto}</span>
      <IconBat className="h-3 w-5 text-gold-500/80" />
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
    <div className="relative overflow-hidden bg-night-950 py-2.5" aria-hidden="true" data-hw-observe="">
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_140%_at_50%_100%,rgba(255,106,0,0.16),transparent_70%)]" />
      <div className="relative flex w-max motion-safe:animate-[marquee_48s_linear_infinite] motion-reduce:w-full motion-reduce:justify-center">
        <Group />
        <Group hideOnReduce />
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500/70 to-transparent" />
    </div>
  )
}
