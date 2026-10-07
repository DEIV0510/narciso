import { useId } from 'react'
import { HALLOWEEN_ACTIVE } from '../data/campaign'
import useInView from '../hooks/useInView'
import { BAT_PATH } from './icons'

// Ilustraciones de la edición Halloween: luna, murciélagos, araña, telaraña,
// calabazas (con la corona de la marca o con cara tallada), vela, rama seca,
// rosa oscura y destello dorado. SVG/CSS estáticos; lo que se mueve lo hace un
// contenedor HTML con clases .hw-* de index.css (transform/opacity) y arranca
// cuando entra al viewport (hooks/useInView.js). Todas son decorativas
// (aria-hidden, sin eventos de puntero). Quien las usa pasa su propia
// posición (`absolute`/`relative`) y tamaño en `className`.

const uidOf = (id) => id.replace(/:/g, '')

// --- Luna llena -------------------------------------------------------------

// `rise`: sube con un fundido la primera vez que se ve. `parallax`: se desplaza
// suavemente según su paso por la pantalla (navegadores con scroll-driven
// animations). El disco y su halo viven en .hw-moon (index.css).
export function Moon({ className = '', rise = false, riseDelay = 0, parallax = false, soft = false }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  const motion = rise ? (seen ? 'hw-rise' : 'opacity-0') : ''
  const par = parallax === 'root' ? 'hw-par-slow' : parallax ? 'hw-par-view' : ''
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className={`h-full w-full ${par}`}>
        <div
          className={`hw-moon relative h-full w-full ${soft ? 'hw-moon--soft' : ''} ${motion}`}
          style={rise && riseDelay ? { animationDelay: `${riseDelay}s` } : undefined}
        />
      </div>
    </div>
  )
}

// --- Murciélagos --------------------------------------------------------------

export function BatSvg({ className = '', rim = false }) {
  return (
    <svg viewBox="0 0 64 32" className={`block h-auto w-full ${className}`} aria-hidden="true">
      <path
        d={BAT_PATH}
        fill="#050505"
        stroke={rim ? 'rgba(255,138,46,0.45)' : 'none'}
        strokeWidth={rim ? 0.9 : 0}
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Murciélagos quietos en el aire (aleteo + leve deriva) — para ponerlos
// delante de una luna. `bats` = [{ left, top, w, delay }] en % del contenedor.
// La deriva es UNA animación para todo el grupo (no una por murciélago): cada
// animación infinita le cuesta al hilo principal (ver nota en index.css).
const DEFAULT_BATS = [
  { left: '8%', top: '30%', w: '15%', delay: '0s' },
  { left: '30%', top: '6%', w: '10%', delay: '-1.6s' },
  { left: '52%', top: '22%', w: '7%', delay: '-3.1s', sm: true },
]

export function Bats({ className = '', bats = DEFAULT_BATS, rim = false }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <div className={`absolute inset-0 ${seen ? 'hw-hover' : ''}`}>
        {bats.map((b, i) => (
          <span
            key={i}
            className={`absolute block ${b.sm ? 'max-sm:hidden' : ''}`}
            style={{ left: b.left, top: b.top, width: b.w }}
          >
            <span className={`block ${seen ? 'hw-flap' : ''}`} style={{ animationDelay: b.delay }}>
              <BatSvg rim={rim} />
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

// Bandada que cruza UNA vez el fondo de la sección cuando esta llega a la
// zona central de la pantalla. Murciélagos con un filo naranja para que se
// lean sobre negro.
const FLIGHT = [
  { top: '14%', w: 34, delay: 0 },
  { top: '24%', w: 22, delay: 0.28 },
  { top: '9%', w: 16, delay: 0.55 },
  { top: '30%', w: 26, delay: 0.16, sm: true },
  { top: '19%', w: 14, delay: 0.72, sm: true },
]

export function BatFlight({ className = '', count = 5, rtl = false, delay = 0 }) {
  const [ref, seen] = useInView('0px 0px -35% 0px')
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {seen &&
        FLIGHT.slice(0, count).map((b, i) => (
          <div
            key={i}
            className={`hw-batflight ${rtl ? 'hw-batflight--rtl' : ''} ${b.sm ? 'max-sm:hidden' : ''}`}
            style={{ top: b.top, animationDelay: `${delay + b.delay}s` }}
          >
            <div className="hw-batflight__bob" style={{ animationDelay: `${delay + b.delay}s` }}>
              <span className="hw-batflight__flap block" style={{ width: b.w, animationDelay: `${delay + b.delay}s` }}>
                <BatSvg rim />
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}

// --- Araña ------------------------------------------------------------------

export function SpiderSvg({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={`block h-auto w-full ${className}`} fill="none" aria-hidden="true">
      <g stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 13.5 11 7.5 6 9.5M16.6 15 9 11.5 3 15.5M16.6 16.8 9 18 3.5 24M17.2 18.4 11 23.5 7.5 31" />
        <path d="M23 13.5 29 7.5 34 9.5M23.4 15 31 11.5 37 15.5M23.4 16.8 31 18 36.5 24M22.8 18.4 29 23.5 32.5 31" />
      </g>
      <g stroke="rgba(232,199,122,0.5)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 13.5 11 7.5 6 9.5M16.6 15 9 11.5 3 15.5M16.6 16.8 9 18 3.5 24M17.2 18.4 11 23.5 7.5 31" />
        <path d="M23 13.5 29 7.5 34 9.5M23.4 15 31 11.5 37 15.5M23.4 16.8 31 18 36.5 24M22.8 18.4 29 23.5 32.5 31" />
      </g>
      <ellipse cx="20" cy="15" rx="4" ry="3.6" fill="#0b0b0b" stroke="rgba(232,199,122,0.55)" strokeWidth="0.7" />
      <ellipse cx="20" cy="25.5" rx="6.2" ry="7.6" fill="#0b0b0b" stroke="rgba(232,199,122,0.55)" strokeWidth="0.7" />
      <path d="M18.3 22.6h3.4L20 25.3Zm0 5.4h3.4L20 25.3Z" fill="#a3182e" />
    </svg>
  )
}

// Araña que baja por su hilo cuando su zona entra a la pantalla y luego se
// mece despacio. El contenedor (posición vía className, p. ej. `absolute
// top-0 left-[12%]`) recorta el hilo, que es más largo de lo que se ve.
export function Spider({ className = '', drop = 110, size = 26 }) {
  const [ref, seen] = useInView('0px 0px -20% 0px')
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      style={{ height: drop + size + 14, width: size * 1.6 }}
    >
      <div className={`absolute inset-x-0 bottom-0 ${seen ? 'hw-spider-drop' : 'opacity-0'}`}>
        <div className={`flex flex-col items-center ${seen ? 'hw-spider-bob' : ''}`}>
          <span className="block w-px bg-cream-200/45" style={{ height: drop + 420 }} />
          <span className="-mt-1.5 block" style={{ width: size }}>
            <SpiderSvg />
          </span>
        </div>
      </div>
    </div>
  )
}

// --- Telaraña de esquina -------------------------------------------------------

// Radios en abanico de 90° y anillos que se comban hacia la esquina, con un
// leve desorden determinista para que no parezca dibujada con compás.
function buildWeb() {
  const N = 7
  const R = 100
  const jitter = [0, 0.03, -0.02, 0.025, -0.03, 0.02, -0.015, 0]
  const angles = Array.from({ length: N + 1 }, (_, i) => (i / N) * (Math.PI / 2) + jitter[i])
  const f = (n) => n.toFixed(1)
  let d = ''
  for (const a of angles) d += `M0 0L${f(R * Math.cos(a))} ${f(R * Math.sin(a))}`
  const rings = [13, 24, 36, 49, 63, 78, 93]
  rings.forEach((r, k) => {
    for (let i = 0; i < N; i++) {
      // Algún tramo suelto (roto) en los anillos exteriores.
      if (k >= 5 && (i + k) % 5 === 0) continue
      const a1 = angles[i]
      const a2 = angles[i + 1]
      const am = (a1 + a2) / 2
      const r1 = r * (1 + ((i * 7 + k * 3) % 5) * 0.012)
      const r2 = r * (1 + (((i + 1) * 7 + k * 3) % 5) * 0.012)
      d += `M${f(r1 * Math.cos(a1))} ${f(r1 * Math.sin(a1))}Q${f(r * 0.84 * Math.cos(am))} ${f(r * 0.84 * Math.sin(am))} ${f(
        r2 * Math.cos(a2)
      )} ${f(r2 * Math.sin(a2))}`
    }
  })
  return d
}
const WEB_D = buildWeb()
const DEW = [
  [24, 9],
  [41, 30],
  [14, 47],
  [60, 22],
]
const CORNER_TRANSFORM = {
  tl: undefined,
  tr: 'translate(100 0) scale(-1 1)',
  bl: 'translate(0 100) scale(1 -1)',
  br: 'translate(100 100) scale(-1 -1)',
}

// `corner`: esquina donde nace la tela (tl/tr/bl/br). Color por currentColor
// (usar crema/dorado con baja opacidad). Aparece con un fundido al verse.
export function Cobweb({ className = '', corner = 'tl', dew = true }) {
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none hw-appear ${seen ? 'is-in' : ''} ${className}`}
    >
      <g transform={CORNER_TRANSFORM[corner]}>
        <path d={WEB_D} stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {dew && DEW.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#e8c77a" opacity="0.85" />)}
      </g>
    </svg>
  )
}

// --- Calabazas ----------------------------------------------------------------

function PumpkinBody({ uid }) {
  return (
    <>
      <ellipse cx="110" cy="182" rx="84" ry="8" fill="#000" opacity=".6" />
      <g fill={`url(#${uid}-body)`} stroke="rgba(255,138,46,0.28)" strokeWidth="1.2">
        <ellipse cx="50" cy="112" rx="38" ry="54" />
        <ellipse cx="170" cy="112" rx="38" ry="54" />
        <ellipse cx="78" cy="108" rx="42" ry="64" />
        <ellipse cx="142" cy="108" rx="42" ry="64" />
        <ellipse cx="110" cy="106" rx="44" ry="68" />
      </g>
      <ellipse cx="110" cy="118" rx="84" ry="58" fill={`url(#${uid}-inner)`} />
      <path
        d="M106 44C102 30 106 16 118 8l10 6c-6 8-8 18-8 30Z"
        fill="#1a130c"
        stroke="rgba(232,199,122,0.4)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M84 54c9-9 22-14 35-14" stroke="rgba(246,234,208,0.32)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </>
  )
}

function PumpkinDefs({ uid }) {
  return (
    <defs>
      <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a1a0f" />
        <stop offset="1" stopColor="#090605" />
      </linearGradient>
      <radialGradient id={`${uid}-inner`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#ff6a00" stopOpacity=".34" />
        <stop offset="1" stopColor="#ff6a00" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-fire`} cx="50%" cy="45%" r="60%">
        <stop offset="0" stopColor="#fff4c2" />
        <stop offset=".35" stopColor="#ffc04d" />
        <stop offset=".72" stopColor="#ff8a1f" />
        <stop offset="1" stopColor="#e65c00" />
      </radialGradient>
    </defs>
  )
}

// Calabaza oscura con la corona de la marca tallada y encendida.
export function Pumpkin({ className = '' }) {
  const uid = uidOf(useId())
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 192" fill="none" className="block h-auto w-full">
        <PumpkinDefs uid={uid} />
        <PumpkinBody uid={uid} />
        <g transform="translate(110 112)" fill={`url(#${uid}-fire)`}>
          <g stroke="#ff6a00" strokeWidth="7" strokeLinejoin="round" opacity=".28">
            <path d="M-22 18V-6L-11 6 0-14 11 6 22-6V18Z" />
          </g>
          <path d="M-22 18V-6L-11 6 0-14 11 6 22-6V18Z" />
          <path d="M-22 22H22V27H-22Z" />
          <path d="M0-27 4-20 0-14-4-20Z" />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-[58%] h-[52%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.42),transparent)] ${
          seen ? 'hw-breathe' : ''
        }`}
      />
    </div>
  )
}

// Calabaza tallada clásica (ojos y boca angulosos, sin caricatura) con luz de
// vela dentro: el símbolo que se reconoce de un vistazo.
export function JackOLantern({ className = '' }) {
  const uid = uidOf(useId())
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  const face =
    'M70 100 101 92 93 116ZM150 100 119 92 127 116ZM110 116 103 130H117ZM62 132C80 145 140 145 158 132 152 155 130 167 110 167S68 155 62 132Z'
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 192" fill="none" className="block h-auto w-full">
        <PumpkinDefs uid={uid} />
        <PumpkinBody uid={uid} />
        <path d={face} stroke="#ff6a00" strokeWidth="9" strokeLinejoin="round" opacity=".22" />
        <path d={face} fill={`url(#${uid}-fire)`} />
        <g fill="#1a110a">
          <path d="M86 140 97 141 92 152Z" />
          <path d="M123 141 134 140 128 152Z" />
          <path d="M103 167 117 167 110 156Z" />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-[64%] h-[70%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.36),transparent)] ${
          seen ? 'hw-breathe' : ''
        }`}
      />
    </div>
  )
}

// --- Rama seca ------------------------------------------------------------------

// `flip` la espeja horizontalmente. Hereda el color con currentColor; úsala en
// tonos casi negros (siluetas contra la luna o el resplandor).
export function Branch({ className = '', flip = false }) {
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={`pointer-events-none ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path d="M418 8C360 36 318 62 268 104S170 168 108 198 34 244 8 304" strokeWidth="6" />
      <g strokeWidth="3.4">
        <path d="M352 32C344 56 340 78 322 96" />
        <path d="M318 60C296 52 276 54 252 40" />
        <path d="M286 92C272 120 252 138 236 168" />
        <path d="M240 126C214 114 190 120 160 104" />
        <path d="M176 156C166 182 144 194 128 222" />
        <path d="M134 184C110 176 88 182 60 164" />
        <path d="M84 214C72 232 56 246 46 268" />
      </g>
      <g strokeWidth="1.8">
        <path d="M322 96C334 108 338 122 336 138" />
        <path d="M252 40C262 30 276 28 288 30" />
        <path d="M236 168C244 180 242 196 234 208" />
        <path d="M160 104C150 92 150 80 156 66" />
        <path d="M128 222C138 232 138 248 130 262" />
        <path d="M60 164C52 152 52 138 60 126" />
        <path d="M46 268C56 274 58 288 52 300" />
        <path d="M200 140C206 150 214 154 222 154" />
        <path d="M300 74C310 70 322 72 330 80" />
      </g>
    </svg>
  )
}

// --- Vela ------------------------------------------------------------------------

// Vela de cera (marfil o negra) con gotas, llama que parpadea y halo que
// respira. El halo es más ancho que la vela: no recortar el contenedor.
export function Candle({ className = '', tone = 'ivory', glow = true }) {
  const uid = uidOf(useId())
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  const ivory = tone === 'ivory'
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      {glow && (
        <span
          className={`absolute left-1/2 top-[-6%] block h-[46%] w-[260%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,46,0.42),rgba(255,106,0,0.12)_55%,transparent)] ${
            seen ? 'hw-breathe' : ''
          }`}
        />
      )}
      <span className={`absolute left-1/2 top-0 block h-[30%] w-[52%] -translate-x-1/2 ${seen ? 'hw-flicker' : ''}`}>
        <svg viewBox="0 0 20 30" className="block h-full w-full" fill="none">
          <defs>
            <linearGradient id={`${uid}-f`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe7a8" />
              <stop offset=".55" stopColor="#ffa640" />
              <stop offset="1" stopColor="#ff6a00" />
            </linearGradient>
          </defs>
          <path d="M10 1C15 8 17 15 10 29 3 15 5 8 10 1Z" fill={`url(#${uid}-f)`} />
          <path d="M10 13C12.4 17 12.4 21.5 10 26 7.6 21.5 7.6 17 10 13Z" fill="#fff6d8" opacity=".92" />
        </svg>
      </span>
      <svg viewBox="0 0 40 124" fill="none" className="relative block h-full w-full">
        <defs>
          <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="0">
            {ivory ? (
              <>
                <stop offset="0" stopColor="#6f624e" />
                <stop offset=".32" stopColor="#d9ccb4" />
                <stop offset=".5" stopColor="#f2e9d8" />
                <stop offset=".78" stopColor="#bfae92" />
                <stop offset="1" stopColor="#5d513f" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#0b0908" />
                <stop offset=".45" stopColor="#2a221c" />
                <stop offset="1" stopColor="#090807" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`${uid}-warm`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff8a2e" stopOpacity=".38" />
            <stop offset=".35" stopColor="#ff8a2e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M20 44v-8" stroke="#2a2018" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="8" y="42" width="24" height="80" rx="3" fill={`url(#${uid}-b)`} stroke={ivory ? 'rgba(255,214,160,0.25)' : 'rgba(201,164,92,0.32)'} strokeWidth="1" />
        <rect x="8" y="42" width="24" height="80" rx="3" fill={`url(#${uid}-warm)`} />
        <path
          d="M11 43v12c0 2.6 3.4 2.6 3.4 0v-6c0 2 2.8 2 2.8 0V43M24 43v18c0 2.6 3.2 2.6 3.2 0V43"
          fill={ivory ? '#efe5d1' : '#1d1814'}
          opacity={ivory ? 0.85 : 1}
        />
        <ellipse cx="20" cy="43" rx="12" ry="2.4" fill={ivory ? '#f8f1e3' : '#2a231d'} />
      </svg>
    </div>
  )
}

// --- Rosa oscura ------------------------------------------------------------------

export function Rose({ className = '' }) {
  const uid = uidOf(useId())
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <svg viewBox="0 0 80 120" fill="none" className={`pointer-events-none ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-p`} cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#6e1624" />
          <stop offset=".55" stopColor="#3d0a12" />
          <stop offset="1" stopColor="#170307" />
        </radialGradient>
      </defs>
      <g stroke="#101710" strokeWidth="2.4" strokeLinecap="round">
        <path d="M40 56c-2 18 3 36-1 62" />
      </g>
      <path d="M40 84C30 76 20 78 15 84c7 6 17 6 25 0Z" fill="#0f150f" stroke="rgba(232,199,122,0.35)" strokeWidth=".6" />
      <path d="M40 84c-9-2-18-1-24 0" stroke="rgba(232,199,122,0.25)" strokeWidth=".5" />
      <path d="m41.4 70 3.2-2-2.4 3.6ZM38.5 100l-3.2-1.6 2.8 3.2Z" fill="#0f150f" />
      <g fill={`url(#${uid}-p)`} stroke="rgba(232,199,122,0.42)" strokeWidth=".7" strokeLinejoin="round">
        <path d="M28 12c4-6 20-6 24 0-4-1-8 0-12 3-4-3-8-4-12-3Z" />
        <path d="M16 30c-2-12 6-20 16-20-6 6-8 14-6 22-4 1-8 0-10-2Z" />
        <path d="M64 30c2-12-6-20-16-20 6 6 8 14 6 22 4 1 8 0 10-2Z" />
        <path d="M16 30c0 16 12 26 24 26s24-10 24-26c-6 6-14 8-24 8s-18-2-24-8Z" />
        <path d="M26 32c0-10 6-17 14-17s14 7 14 17c-4 4-9 6-14 6s-10-2-14-6Z" />
      </g>
      <path
        d="M40 20c5 0 8 4 7 8-1 4-6 5-9 3s-3-6 0-7c2-1 4 1 3 3M30 30c3 4 7 5 10 5M50 30c-3 4-7 5-10 5"
        stroke="rgba(232,199,122,0.48)"
        strokeWidth=".8"
        strokeLinecap="round"
      />
      <path d="M33 55l-5 6 7-3 5 5 5-5 7 3-5-6" fill="#0f150f" stroke="rgba(232,199,122,0.35)" strokeWidth=".6" strokeLinejoin="round" />
    </svg>
  )
}

// --- Destello dorado ----------------------------------------------------------------

// Estrella de 4 puntas que destella cada pocos segundos (reflejo sobre metal).
export function Glint({ className = '' }) {
  const uid = uidOf(useId())
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <span ref={ref} aria-hidden="true" className={`pointer-events-none block ${className}`}>
      <span className={`block h-full w-full ${seen ? 'hw-glint' : 'opacity-0'}`}>
        <svg viewBox="0 0 24 24" className="block h-full w-full">
          <defs>
            <radialGradient id={`${uid}-g`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fffaf0" />
              <stop offset=".4" stopColor="#f6ead0" />
              <stop offset="1" stopColor="#e8c77a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M12 0C12.7 8 16 11.3 24 12 16 12.7 12.7 16 12 24 11.3 16 8 12.7 0 12 8 11.3 11.3 8 12 0Z" fill={`url(#${uid}-g)`} />
        </svg>
      </span>
    </span>
  )
}
