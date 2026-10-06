import { useId } from 'react'
import { HALLOWEEN_ACTIVE } from '../data/campaign'
import useInView from '../hooks/useInView'

// Siluetas de la edición Halloween: calabaza oscura con la corona de la marca
// tallada y encendida, rama seca y vela. SVG estático (sin animar el svg: el
// parpadeo vive en un contenedor HTML aparte, que arranca al entrar al
// viewport — ver hooks/useInView.js). Decorativas y sutiles. Quien las usa
// debe pasar su propia posición (`absolute`/`relative`) en `className`.

export function Pumpkin({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none" className="block h-auto w-full">
        <defs>
          <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#201811" />
            <stop offset="1" stopColor="#090706" />
          </linearGradient>
          <radialGradient id={`${uid}-lit`} cx="50%" cy="52%" r="52%">
            <stop offset="0" stopColor="#f2a766" stopOpacity=".5" />
            <stop offset="1" stopColor="#f2a766" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-crown`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8d08a" />
            <stop offset="1" stopColor="#e2792a" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="178" rx="82" ry="8" fill="#000" opacity=".55" />
        <g fill={`url(#${uid}-body)`} stroke="rgba(201,162,75,0.3)" strokeWidth="1.2">
          <ellipse cx="50" cy="110" rx="38" ry="54" />
          <ellipse cx="170" cy="110" rx="38" ry="54" />
          <ellipse cx="78" cy="106" rx="42" ry="64" />
          <ellipse cx="142" cy="106" rx="42" ry="64" />
          <ellipse cx="110" cy="104" rx="44" ry="68" />
        </g>
        <path
          d="M104 42C100 28 104 14 116 6l10 6c-6 8-8 18-8 30Z"
          fill="#17120d"
          stroke="rgba(201,162,75,0.34)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M82 52c9-9 22-14 35-14" stroke="rgba(243,230,196,0.38)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="110" cy="108" r="46" fill={`url(#${uid}-lit)`} />
        <g transform="translate(110 108)">
          <g stroke="#f2a766" strokeWidth="6" strokeLinejoin="round" opacity=".28">
            <path d="M-22 18V-6L-11 6 0-14 11 6 22-6V18Z" />
          </g>
          <path d="M-22 18V-6L-11 6 0-14 11 6 22-6V18Z" fill={`url(#${uid}-crown)`} />
          <path d="M-22 22H22V27H-22Z" fill={`url(#${uid}-crown)`} />
          <path d="M0-27 4-20 0-14-4-20Z" fill={`url(#${uid}-crown)`} />
        </g>
      </svg>
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-[56%] h-[48%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,167,102,0.4),transparent)] ${
          seen ? 'hw-breathe' : ''
        }`}
      />
    </div>
  )
}

// Rama seca (esquina). `flip` la espeja horizontalmente. Hereda el color con
// currentColor; úsala en tonos casi negros y baja opacidad.
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

// Vela oscura con llama pequeña que parpadea.
export function Candle({ className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [ref, seen] = useInView()
  if (!HALLOWEEN_ACTIVE) return null
  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <span
        className={`absolute left-1/2 top-0 block h-[34%] w-[56%] -translate-x-1/2 ${seen ? 'hw-flicker' : ''}`}
      >
        <svg viewBox="0 0 20 30" className="block h-full w-full" fill="none">
          <defs>
            <linearGradient id={`${uid}-f`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f8d08a" />
              <stop offset="1" stopColor="#e2792a" />
            </linearGradient>
          </defs>
          <path d="M10 1C15 8 17 15 10 29 3 15 5 8 10 1Z" fill={`url(#${uid}-f)`} />
          <path d="M10 13C12.4 17 12.4 21.5 10 26 7.6 21.5 7.6 17 10 13Z" fill="#fff1c9" opacity=".9" />
        </svg>
      </span>
      <span
        className={`absolute left-1/2 top-[8%] h-[40%] w-[170%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,167,102,0.4),transparent)] ${
          seen ? 'hw-breathe' : ''
        }`}
      />
      <svg viewBox="0 0 40 124" fill="none" className="relative block h-full w-full">
        <defs>
          <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0c0a08" />
            <stop offset="0.45" stopColor="#241c14" />
            <stop offset="1" stopColor="#0a0807" />
          </linearGradient>
        </defs>
        <path d="M20 44v-8" stroke="#2a2018" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="8" y="44" width="24" height="78" rx="3" fill={`url(#${uid}-b)`} stroke="rgba(201,162,75,0.32)" strokeWidth="1" />
        <path d="M13 44v13c0 3 4 3 4 0V44" fill="rgba(243,230,196,0.14)" />
        <path d="M8 47c3-2 21-2 24 0" stroke="rgba(243,230,196,0.35)" strokeWidth="1" />
      </svg>
    </div>
  )
}
