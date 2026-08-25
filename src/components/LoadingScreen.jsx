import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1300)
    const unmountTimer = setTimeout(() => setMounted(false), 1650)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink-900 transition-opacity duration-300 ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <span className="absolute h-64 w-64 rounded-full bg-gold-500/10 blur-3xl motion-safe:animate-[ringExpand_1.8s_ease-out_infinite]" />

      <svg viewBox="0 0 80 130" className="relative h-24 w-auto sm:h-28" role="img" aria-label="Sirviendo Narciso Parfum">
        <defs>
          <linearGradient id="ls-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6cd93" />
            <stop offset="55%" stopColor="#c9a24b" />
            <stop offset="100%" stopColor="#93692c" />
          </linearGradient>
        </defs>

        {/* Cuerpo del frasco: contorno que se "dibuja" con stroke-dashoffset */}
        <rect
          x="14"
          y="40"
          width="52"
          height="80"
          rx="14"
          fill="none"
          stroke="#c9a24b"
          strokeWidth="2.5"
          strokeDasharray="300"
          strokeDashoffset="300"
          className="motion-safe:[animation:bottleDraw_0.9s_ease-out_0.1s_forwards]"
        />

        {/* Líquido dorado que llena el frasco de abajo hacia arriba */}
        <rect
          x="17"
          y="43"
          width="46"
          height="74"
          rx="11"
          fill="url(#ls-liquid)"
          className="motion-safe:[animation:bottleFill_0.9s_cubic-bezier(0.65,0,0.35,1)_0.35s_forwards]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        />

        <rect
          x="34"
          y="27"
          width="12"
          height="14"
          fill="#18140f"
          stroke="#c9a24b"
          strokeWidth="2"
          className="motion-safe:animate-fadeIn [animation-delay:120ms]"
          style={{ opacity: 0 }}
        />
        <circle
          cx="40"
          cy="17"
          r="11.5"
          fill="#d8b264"
          stroke="#f3e6c4"
          strokeWidth="1.5"
          className="motion-safe:animate-fadeIn"
          style={{ opacity: 0 }}
        />
      </svg>

      <span className="relative mt-6 font-display text-2xl tracking-[0.32em] sm:text-3xl">
        <span className="shimmer-text motion-safe:animate-fadeUp [animation-delay:520ms]" style={{ opacity: 0 }}>
          NARCISO
        </span>
      </span>
      <span
        className="relative mt-2 font-body text-[10px] tracking-widest2 text-ink-300 motion-safe:animate-fadeUp sm:text-xs [animation-delay:680ms]"
        style={{ opacity: 0 }}
      >
        PARFUM
      </span>

      <span
        className="relative mt-6 h-px w-16 origin-center bg-gold-400 motion-safe:[animation:underlineIn_0.6s_cubic-bezier(0.65,0,0.35,1)_0.85s_forwards]"
        style={{ opacity: 0, transform: 'scaleX(0)' }}
      />
    </div>
  )
}
