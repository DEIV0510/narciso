import { VALENTINES_ACTIVE } from '../data/campaign'
import { IconHeart, IconPetal, IconSparkle } from './icons'

// Capa decorativa reutilizable para la campaña de San Valentín: unos pocos
// corazones/pétalos/destellos flotando muy suave, siempre `pointer-events-none`
// para no interferir con clics/scroll, y respetando prefers-reduced-motion
// (motion-safe: en vez de aplicar la animación directo). No dibuja nada si
// la campaña está apagada (ver data/campaign.js).
// Clases de animación escritas literales a propósito (no interpoladas): el
// escáner de contenido de Tailwind necesita ver el nombre completo de la
// clase en el código fuente para generar su CSS.
const GLYPHS = [
  {
    Icon: IconHeart,
    className: 'absolute motion-safe:animate-heartFloat left-[6%] top-[18%] h-5 w-5 text-wine-300/80',
    delay: '0s',
    dur: '6.5s',
  },
  {
    Icon: IconSparkle,
    className: 'absolute motion-safe:animate-twinkle right-[10%] top-[12%] h-4 w-4 text-gold-300/90',
    delay: '0.8s',
    dur: '3.4s',
  },
  {
    Icon: IconPetal,
    className: 'absolute motion-safe:animate-heartFloat left-[16%] top-[62%] h-5 w-5 rotate-[-18deg] text-wine-200/70',
    delay: '1.6s',
    dur: '7s',
  },
  {
    Icon: IconHeart,
    className: 'absolute hidden motion-safe:animate-heartFloat right-[8%] top-[70%] h-4 w-4 text-wine-300/70 sm:block',
    delay: '2.4s',
    dur: '5.5s',
  },
  {
    Icon: IconSparkle,
    className: 'absolute motion-safe:animate-twinkle left-[45%] top-[8%] h-3.5 w-3.5 text-gold-200/90',
    delay: '1.1s',
    dur: '3s',
  },
  {
    Icon: IconPetal,
    className: 'absolute hidden motion-safe:animate-heartFloat right-[30%] top-[35%] h-4 w-4 rotate-[12deg] text-wine-300/60 sm:block',
    delay: '3.1s',
    dur: '6.2s',
  },
]

export default function ValentineAccents({ className = '' }) {
  if (!VALENTINES_ACTIVE) return null
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {GLYPHS.map(({ Icon, className: glyphClass, delay, dur }, i) => (
        <Icon key={i} className={glyphClass} style={{ animationDelay: delay, animationDuration: dur }} />
      ))}
    </div>
  )
}
