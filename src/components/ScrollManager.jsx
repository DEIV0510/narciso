import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Con react-router, navegar a "/#seccion" desde otra ruta (ej. una ficha de
// producto) NO dispara el scroll nativo del navegador a esa ancla — solo
// cambia el historial. Este componente lo emula: si la nueva ubicación trae
// un hash, hace scroll a ese elemento; si no, sube al inicio de la página
// (comportamiento normal al cambiar de ruta).
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = hash.slice(1)
    let attempts = 0
    let raf = 0

    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 10) raf = requestAnimationFrame(tryScroll)
    }

    tryScroll()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}
