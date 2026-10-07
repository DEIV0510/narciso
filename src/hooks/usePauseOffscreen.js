import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Pausa las animaciones de ambiente de las secciones que están lejos de la
// pantalla. React escucha `animationiteration` en la raíz, así que cada
// animación infinita despierta al hilo principal en cada vuelta aunque no se
// vea; pausada, no. Además, una animación compuesta que queda muy lejos del
// viewport (la marquesina de la barra superior al llegar al footer) Chrome la
// pasa al hilo principal. Marca con `data-hw-idle` (regla en index.css) cada
// hijo directo de <main>, el footer y los elementos con `data-hw-observe`
// mientras estén a más de 300 px del viewport.
export default function usePauseOffscreen() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute('data-hw-idle', !e.isIntersecting)
      },
      { rootMargin: '300px 0px' }
    )
    const targets = [...document.querySelectorAll('main > *, footer, [data-hw-observe]')]
    targets.forEach((t) => io.observe(t))
    return () => {
      io.disconnect()
      targets.forEach((t) => t.removeAttribute('data-hw-idle'))
    }
  }, [pathname])
}
