import { useEffect, useRef, useState } from 'react'
import { IconChevronRight } from './icons'

export default function ProductRow({ children }) {
  const scrollerRef = useRef(null)
  // Los degradados de borde solo aparecen cuando hay más fila por ese lado
  // (si no, el de la izquierda tapaba el primer botón "Comprar").
  const [edges, setEdges] = useState({ start: true, end: false })

  function updateEdges() {
    const el = scrollerRef.current
    if (!el) return
    const start = el.scrollLeft <= 8
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }))
  }

  useEffect(updateEdges, [children])

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
        onScroll={updateEdges}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-6 pt-2 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-night-950 to-transparent transition-opacity duration-300 sm:w-16 ${
          edges.start ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-night-950 to-transparent transition-opacity duration-300 sm:w-16 ${
          edges.end ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Ver fragancias anteriores"
        className="absolute left-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 bg-night-800 text-gold-300 shadow-lg shadow-black/60 transition-all hover:scale-105 hover:border-ember-500 hover:bg-ember-500 hover:text-night-950 hover:shadow-[0_0_22px_-4px_rgba(255,106,0,0.8)] sm:flex"
      >
        <IconChevronRight className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Ver más fragancias"
        className="absolute right-1 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/40 bg-night-800 text-gold-300 shadow-lg shadow-black/60 transition-all hover:scale-105 hover:border-ember-500 hover:bg-ember-500 hover:text-night-950 hover:shadow-[0_0_22px_-4px_rgba(255,106,0,0.8)] sm:flex"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
