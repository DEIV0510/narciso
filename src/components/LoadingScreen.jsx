import { useEffect, useState } from 'react'
import crownWebp from '../assets/img/crown-mark.webp'
import crownPng from '../assets/img/crown-mark.png'

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
      <span className="absolute h-72 w-72 rounded-full bg-gold-500/10 blur-3xl motion-safe:animate-[ringExpand_1.8s_ease-out_infinite]" />

      <div className="relative h-16 w-[7.4rem] sm:h-20 sm:w-[9.25rem]">
        <picture>
          <source srcSet={crownWebp} type="image/webp" />
          <img
            src={crownPng}
            alt="Narciso Parfum"
            className="h-full w-full object-contain motion-safe:[animation:crownIn_0.7s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            style={{ opacity: 0 }}
          />
        </picture>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 motion-safe:[animation:shineSweep_1s_ease-in-out_0.55s_1]"
          style={{
            backgroundImage:
              'linear-gradient(75deg, transparent 40%, rgba(255,255,255,0.95) 50%, transparent 60%)',
            backgroundSize: '260% 100%',
            backgroundPosition: '160% 0',
            WebkitMaskImage: `url(${crownPng})`,
            maskImage: `url(${crownPng})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <span className="relative mt-5 font-display text-2xl tracking-[0.32em] sm:text-3xl">
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
