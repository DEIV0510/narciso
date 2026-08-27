import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { formatCOP } from '../data/products'
import { useCart } from '../context/CartContext'
import CartItemRow from './CartItemRow'
import { IconBag, IconX } from './icons'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, closeCart, openCheckout } = useCart()
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!drawerOpen) return
    previouslyFocused.current = document.activeElement
    closeBtnRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeCart()
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
  }, [drawerOpen, closeCart])

  const isEmpty = items.length === 0

  return (
    <div
      className={`fixed inset-0 z-[95] transition-opacity duration-300 ease-out ${
        drawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      {...(drawerOpen ? {} : { inert: '' })}
    >
      <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm" onClick={closeCart} />

      <div
        ref={panelRef}
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-[-16px_0_48px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-7">
          <div>
            <h2 id="cart-drawer-title" className="font-display text-xl text-ink-900">
              Tu carrito
            </h2>
            {!isEmpty && (
              <p className="mt-0.5 font-body text-xs text-ink-400">
                {items.reduce((sum, i) => sum + i.qty, 0)} {items.reduce((sum, i) => sum + i.qty, 0) === 1 ? 'producto' : 'productos'}
              </p>
            )}
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-100 text-ink-600 transition-colors hover:bg-cream-200"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-50 text-gold-500">
              <IconBag className="h-9 w-9" />
            </span>
            <p className="mt-6 font-display text-xl text-ink-900">Tu colección está esperando.</p>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink-400">
              Aún no has elegido tu próxima fragancia. Explora el catálogo y encuentra la tuya.
            </p>
            <Link
              to="/#catalogo"
              onClick={closeCart}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-ink-900 px-8 py-3.5 font-body text-xs uppercase tracking-wide text-cream-50 transition-transform duration-200 hover:scale-[1.02] hover:bg-gold-600"
            >
              Explorar perfumes
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-ink-100 overflow-y-auto px-5 sm:px-7">
              {items.map((item) => (
                <CartItemRow key={item.lineId} item={item} />
              ))}
            </ul>

            <div className="border-t border-ink-100 px-5 py-5 sm:px-7">
              <div className="space-y-2 font-body text-sm">
                <div className="flex items-center justify-between text-ink-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatCOP(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-ink-400">
                  <span>Envío</span>
                  <span>Calcular al finalizar</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
                <span className="font-display text-base text-ink-900">Total</span>
                <span className="font-display text-2xl text-gold-600 tabular-nums">{formatCOP(subtotal)}</span>
              </div>

              <button
                type="button"
                onClick={openCheckout}
                className="mt-5 flex w-full items-center justify-center rounded-full bg-gold-500 py-4 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.01] hover:bg-gold-400"
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
