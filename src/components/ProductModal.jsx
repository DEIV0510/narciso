import { useEffect, useRef, useState } from 'react'
import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import spotlightAvif from '../assets/img/spotlight-bottle.avif'
import spotlightWebp from '../assets/img/spotlight-bottle.webp'
import spotlightJpg from '../assets/img/spotlight-bottle.jpg'
import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import { waLink, waMessages } from '../data/site'
import { IconX } from './icons'

const gallery = [
  { avif: spotlightAvif, webp: spotlightWebp, jpg: spotlightJpg, alt: 'Frasco de Narciso Parfum sobre madera' },
  { avif: heroAvif, webp: heroWebp, jpg: heroJpg, alt: 'Narciso Parfum junto a otros frascos de la colección' },
  { avif: labelAvif, webp: labelWebp, jpg: labelJpg, alt: 'Detalle de la etiqueta y tapa dorada de Narciso Parfum' },
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProductModal({ open, onClose }) {
  const [active, setActive] = useState(0)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return
    setActive(0)
    previouslyFocused.current = document.activeElement
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = [...panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR)]
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const current = gallery[active]

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink-900/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-cream-50 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900/80 text-cream-50 transition-colors hover:bg-ink-900"
        >
          <IconX className="h-4 w-4" />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <div className="bg-ink-900">
            <picture>
              <source srcSet={current.avif} type="image/avif" />
              <source srcSet={current.webp} type="image/webp" />
              <img src={current.jpg} alt={current.alt} className="aspect-square w-full object-cover sm:aspect-auto sm:h-full" />
            </picture>
            <div className="flex gap-2 p-3">
              {gallery.map((g, i) => (
                <button
                  key={g.jpg}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  aria-pressed={active === i}
                  className={`h-14 w-14 overflow-hidden rounded-lg border-2 transition-colors ${
                    active === i ? 'border-gold-400' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={g.jpg} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="section-eyebrow text-gold-600">Especialistas en inspiración</p>
            <h3 id="product-modal-title" className="mt-2 font-display text-3xl text-ink-900">
              Narciso Parfum
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">
              Eau de parfum en spray presurizado, elaborada en Ibagué, Tolima. Una fragancia
              inspirada, pensada para quienes buscan un aroma sofisticado y memorable.
            </p>

            <ul className="mt-5 space-y-2 font-body text-sm text-ink-600">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold-500" /> Eau de parfum / vaporisateur
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold-500" /> Spray presurizado
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold-500" /> Elaborado en Ibagué, Tolima
              </li>
            </ul>

            <div className="mt-6 inline-flex w-fit items-center rounded-full bg-gold-50 px-4 py-2 font-body text-xs uppercase tracking-wide text-gold-700">
              Consulta disponibilidad y precio
            </div>

            <a
              href={waLink(waMessages.product)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#25D366] px-7 py-4 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform hover:scale-[1.02]"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
