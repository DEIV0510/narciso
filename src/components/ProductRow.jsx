import { useRef } from 'react'
import { IconChevronRight } from './icons'

export default function ProductRow({ children }) {
  const scrollerRef = useRef(null)

  function scrollNext() {
    const el = scrollerRef.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.85, behavior: 'smooth' })
  }

  function scrollPrev() {
    const el = scrollerRef.current
    if (!el) return
    const atStart = el.scrollLeft <= 8
    el.scrollTo({ left: atStart ? el.scrollWidth : el.scrollLeft - el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-cream-50 to-transparent sm:w-16" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream-50 to-transparent sm:w-16" />
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Ver fragancias anteriores"
        className="absolute left-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900 text-cream-50 shadow-lg transition-transform hover:scale-105 sm:flex"
      >
        <IconChevronRight className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Ver más fragancias"
        className="absolute right-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900 text-cream-50 shadow-lg transition-transform hover:scale-105 sm:flex"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
