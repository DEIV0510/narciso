import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 550)
    const unmountTimer = setTimeout(() => setMounted(false), 850)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-900 transition-opacity duration-300 ease-out ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <span className="font-display text-2xl tracking-[0.32em] text-cream-100 sm:text-3xl">
        NARCISO
      </span>
      <span className="mt-2 font-body text-[10px] tracking-widest2 text-gold-400 sm:text-xs">
        PARFUM
      </span>
      <span className="relative mt-7 h-px w-20 overflow-hidden bg-ink-700">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-gold-400 [animation:loadbar_0.8s_ease-in-out_infinite]" />
      </span>
    </div>
  )
}
