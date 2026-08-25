import { useEffect, useState } from 'react'
import { IconWhatsApp } from './icons'
import { waLink, waMessages } from '../data/site'

export default function WhatsAppButton({ hideForMenu = false }) {
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: '0px 0px -10% 0px',
    })
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const hidden = hideForMenu || nearFooter

  return (
    <a
      href={waLink(waMessages.catalog)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Comprar por WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`group fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink-900 shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-200 hover:scale-105 focus-visible:scale-105 sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] sm:right-7 ${
        hidden ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-pulseRing" />
      <IconWhatsApp className="relative h-7 w-7" />
    </a>
  )
}
