import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'
import useInView from '../hooks/useInView'
import { IconFlame, IconPumpkin } from './icons'

// Efectos de ambiente de la edición Halloween (ver data/campaign.js y los
// estilos .hw-* de index.css). Todo es decorativo: aria-hidden, sin eventos
// de puntero, solo transform/opacity en CSS y quieto con
// prefers-reduced-motion. No dibujan nada si la campaña está apagada.
// Las capas animadas se montan cuando su contenedor entra al viewport (ver
// hooks/useInView.js) para que Chrome las componga en GPU.

// Posición, deriva, duración y retardo de cada brasa. Retardos negativos para
// que al cargar ya haya brasas a media subida. `sm` = se oculta en móvil.
const EMBERS = [
  { left: '8%', v: 'a', dur: '11s', delay: '-2s' },
  { left: '16%', v: 'c', dur: '14s', delay: '-8s', sm: true },
  { left: '27%', v: 'b', dur: '10s', delay: '-5s' },
  { left: '38%', v: 'a', dur: '13s', delay: '-11s', sm: true },
  { left: '49%', v: 'c', dur: '12s', delay: '-3s' },
  { left: '58%', v: 'b', dur: '9s', delay: '-7s', sm: true },
  { left: '67%', v: 'a', dur: '12s', delay: '-1s' },
  { left: '76%', v: 'c', dur: '15s', delay: '-9s', sm: true },
  { left: '84%', v: 'b', dur: '10s', delay: '-4s' },
  { left: '92%', v: 'a', dur: '13s', delay: '-6s', sm: true },
]

const EMBER_VARIANT = { a: '', b: 'hw-ember--b', c: 'hw-ember--c' }

export function Embers({ density = 'full', className = '' }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  const list = density === 'light' ? EMBERS.filter((_, i) => i % 2 === 0) : EMBERS
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {seen &&
        list.map((e, i) => (
          <span
            key={i}
            className={`hw-ember ${EMBER_VARIANT[e.v]} ${e.sm ? 'max-sm:hidden' : ''}`}
            style={{ left: e.left, animationDuration: e.dur, animationDelay: e.delay }}
          />
        ))}
    </div>
  )
}

// Polvo dorado/naranja que flota en el sitio (header, footer, tarjetas).
const MOTES = [
  { left: '6%', top: '30%', dur: '9s', delay: '-1s' },
  { left: '19%', top: '62%', dur: '11s', delay: '-6s', o: true },
  { left: '33%', top: '22%', dur: '10s', delay: '-3s', sm: true },
  { left: '47%', top: '70%', dur: '12s', delay: '-8s' },
  { left: '61%', top: '35%', dur: '9.5s', delay: '-4s', o: true, sm: true },
  { left: '74%', top: '58%', dur: '11s', delay: '-2s' },
  { left: '88%', top: '26%', dur: '10.5s', delay: '-7s', o: true },
  { left: '95%', top: '66%', dur: '12s', delay: '-5s', sm: true },
]

export function Motes({ className = '', count = MOTES.length }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {seen &&
        MOTES.slice(0, count).map((m, i) => (
          <span
            key={i}
            className={`hw-mote ${m.o ? 'hw-mote--orange' : ''} ${m.sm ? 'max-sm:hidden' : ''}`}
            style={{ left: m.left, top: m.top, animationDuration: m.dur, animationDelay: m.delay }}
          />
        ))}
    </div>
  )
}

// Bruma que deriva despacio. `parallax` la mueve a una velocidad distinta
// mientras se baja el primer pantallazo (solo navegadores con scroll-driven
// animations). En móvil se queda con las dos primeras capas.
export function Smoke({ className = '', parallax = false }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {seen && (
        <div className={`absolute inset-0 ${parallax ? 'hw-par-slow' : ''}`}>
          <span className="hw-smoke hw-smoke--a" />
          <span className="hw-smoke hw-smoke--b" />
          <span className="hw-smoke hw-smoke--c max-sm:hidden" />
        </div>
      )}
    </div>
  )
}

// Niebla rasante: banco de bruma que se arrastra despacio por el borde
// inferior del contenedor. Posición/alto por className (p. ej. `inset-x-0
// bottom-0 h-40`). `front` agrega una segunda capa en sentido contrario.
export function Fog({ className = '', front = true }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute overflow-hidden ${className}`}>
      {seen && (
        <>
          <span className="hw-fog" />
          {front && <span className="hw-fog hw-fog--front max-sm:hidden" />}
        </>
      )}
    </div>
  )
}

// Grano fino + pliegues de tela, estáticos.
export function Grain({ fabric = false }) {
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <>
      {fabric && <span aria-hidden="true" className="hw-fabric" />}
      <span aria-hidden="true" className="hw-grain" />
    </>
  )
}

// Llama pequeña que parpadea. El parpadeo vive en un contenedor HTML (no en el
// svg) y arranca cuando la llama ya está a la vista.
export function FlickerFlame({ className = 'h-3 w-3', wrapperClassName = '' }) {
  const [ref, seen] = useInView()
  return (
    <span ref={ref} aria-hidden="true" className={`block ${seen ? 'hw-flicker' : ''} ${wrapperClassName}`}>
      <IconFlame className={className} />
    </span>
  )
}

// Rótulo de temporada "Halloween Edition" en gótica sutil y naranja de vela.
export function HalloweenMark({ className = '', icon = true }) {
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {icon && <IconPumpkin className="h-[0.9em] w-[0.9em] shrink-0 text-ember-400" />}
      <span className="hw-orange-text font-gothic leading-none tracking-wide">{halloweenCopy.heroEyebrow}</span>
    </span>
  )
}
