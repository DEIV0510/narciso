import { useEffect, useRef, useState } from 'react'

// Aparición progresiva liviana basada en IntersectionObserver (sin librerías de animación).
export default function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)

    // Red de seguridad: si el observer no llega a disparar (soporte parcial,
    // pestaña en segundo plano al cargar, etc.), el contenido igual aparece.
    const fallback = setTimeout(() => setVisible(true), 2500)

    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return [ref, visible]
}
