import { HALLOWEEN_ACTIVE } from '../data/campaign'
import { IconMoon, IconPumpkin, IconSkull, IconCandle, IconBat, IconRose } from './icons'
import { SpiderSvg } from './HalloweenArt'

const ICONS = {
  moon: IconMoon,
  pumpkin: IconPumpkin,
  skull: IconSkull,
  candle: IconCandle,
  bat: IconBat,
  rose: IconRose,
}

// Separador temático al borde superior de una sección: ──── ◈ ────, con una
// luna, calabaza, vela, calavera, murciélago o rosa en un medallón con luz de
// vela — o una araña colgando de su hilo (`icon="spider"`). Va DENTRO de la
// sección (que debe ser `relative`) y reemplaza a la línea .hw-top-line.
export default function SectionDivider({ icon = 'moon', className = '' }) {
  if (!HALLOWEEN_ACTIVE) return null
  const Icon = ICONS[icon]
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center ${className}`}>
      <div className="flex w-[min(88%,760px)] items-start pt-5 sm:pt-6">
        <span className="mt-0 h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/30 to-gold-400/60" />
        {icon === 'spider' ? (
          <span className="mx-3 flex flex-col items-center">
            <span className="block h-7 w-px bg-cream-200/45 sm:h-9" />
            <span className="-mt-1 block w-5 sm:w-6">
              <SpiderSvg />
            </span>
          </span>
        ) : (
          <span className="relative mx-3 -mt-4 flex h-8 w-8 items-center justify-center text-gold-300">
            <span className="absolute inset-[-6px] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.4),transparent)]" />
            <span className="absolute inset-0 rounded-full border border-gold-500/35 bg-night-950" />
            <Icon className={`relative ${icon === 'bat' ? 'h-4 w-5' : 'h-4 w-4'} ${icon === 'pumpkin' ? 'text-ember-400' : ''}`} />
          </span>
        )}
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-500/30 to-gold-400/60" />
      </div>
    </div>
  )
}
