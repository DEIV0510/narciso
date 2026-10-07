import { useEffect, useState } from 'react'
import crownWebp from '../assets/img/crown-mark.webp'
import crownPng from '../assets/img/crown-mark.png'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'
import { Embers } from './HalloweenFx'
import { Bats } from './HalloweenArt'

// Pantalla de carga (1,3 s). En la edición Halloween la corona aparece delante
// de una luna de cosecha con murciélagos y el rótulo gótico de temporada: lo
// primero que ve el visitante ya dice "Halloween".
const BATS = [
  { left: '-12%', top: '18%', w: '18%', delay: '-0.3s' },
  { left: '78%', top: '8%', w: '12%', delay: '-1.4s' },
  { left: '66%', top: '70%', w: '9%', delay: '-2.1s' },
]

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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-night-950 transition-opacity duration-300 ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {HALLOWEEN_ACTIVE ? (
        <>
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(255,106,0,0.22),transparent_70%)]" />
          <span className="hw-moon hw-moon--plain absolute left-1/2 top-1/2 aspect-square w-56 -translate-x-1/2 -translate-y-[62%] opacity-30 sm:w-72" />
          <Bats rim bats={BATS} className="absolute left-1/2 top-1/2 aspect-square w-56 -translate-x-1/2 -translate-y-[62%] sm:w-72" />
        </>
      ) : (
        <span className="absolute h-72 w-72 rounded-full bg-ember-500/15 blur-3xl motion-safe:animate-[ringExpand_1.8s_ease-out_infinite]" />
      )}
      <Embers density="light" />

      <picture>
        <source srcSet={crownWebp} type="image/webp" />
        <img
          src={crownPng}
          alt="Gentleman Co"
          className="relative h-20 w-auto sm:h-24 motion-safe:[animation:crownIn_0.7s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
          style={{ opacity: 0 }}
        />
      </picture>

      <span className="relative mt-5 font-display text-2xl tracking-[0.32em] sm:text-3xl">
        <span className="shimmer-text motion-safe:animate-fadeUp [animation-delay:480ms]" style={{ opacity: 0 }}>
          GENTLEMAN
        </span>
      </span>
      <span
        className="relative mt-2 font-body text-[10px] tracking-widest2 text-ink-300 motion-safe:animate-fadeUp sm:text-xs [animation-delay:640ms]"
        style={{ opacity: 0 }}
      >
        CO
      </span>

      <span
        className="relative mt-6 h-px w-16 origin-center bg-gold-400 motion-safe:[animation:underlineIn_0.6s_cubic-bezier(0.65,0,0.35,1)_0.8s_forwards]"
        style={{ opacity: 0, transform: 'scaleX(0)' }}
      />

      {HALLOWEEN_ACTIVE && (
        <span
          className="hw-orange-text relative mt-4 font-gothic text-2xl tracking-wide motion-safe:animate-fadeUp sm:text-3xl [animation-delay:860ms]"
          style={{ opacity: 0 }}
        >
          {halloweenCopy.heroEyebrow}
        </span>
      )}
    </div>
  )
}
