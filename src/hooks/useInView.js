import { useEffect, useRef, useState } from 'react'

// Avisa UNA vez cuando el elemento entra al viewport. Se usa para arrancar las
// animaciones infinitas de ambiente (brasas, llamas, brillos) solo cuando ya
// se ven: Chrome decide al arrancar si una animación se compone en GPU y deja
// en el hilo principal para siempre las que empiezan fuera de pantalla.
// Un único IntersectionObserver compartido para todos los elementos.
const callbacks = new WeakMap()
let observer

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        callbacks.get(entry.target)?.()
        callbacks.delete(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }
  return observer
}

export default function useInView() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return undefined
    callbacks.set(el, () => setSeen(true))
    getObserver().observe(el)
    return () => {
      callbacks.delete(el)
      observer?.unobserve(el)
    }
  }, [seen])

  return [ref, seen]
}
