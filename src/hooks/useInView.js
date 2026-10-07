import { useEffect, useRef, useState } from 'react'

// Avisa UNA vez cuando el elemento entra al viewport. Se usa para arrancar las
// animaciones de ambiente (brasas, llamas, brillos, murciélagos, arañas) solo
// cuando ya se ven: Chrome decide al arrancar si una animación se compone en
// GPU y deja en el hilo principal para siempre las que empiezan fuera de
// pantalla. Un IntersectionObserver compartido por cada rootMargin distinto
// (p. ej. '0px 0px -30% 0px' = esperar a que el elemento suba un poco).
const observers = new Map()

function getObserver(rootMargin) {
  let entry = observers.get(rootMargin)
  if (!entry) {
    const callbacks = new WeakMap()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          callbacks.get(e.target)?.()
          callbacks.delete(e.target)
          observer.unobserve(e.target)
        }
      },
      { rootMargin }
    )
    entry = { observer, callbacks }
    observers.set(rootMargin, entry)
  }
  return entry
}

export default function useInView(rootMargin = '0px') {
  const ref = useRef(null)
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return undefined
    const { observer, callbacks } = getObserver(rootMargin)
    callbacks.set(el, () => setSeen(true))
    observer.observe(el)
    return () => {
      callbacks.delete(el)
      observer.unobserve(el)
    }
  }, [seen, rootMargin])

  return [ref, seen]
}
