import { useEffect, useRef, useState } from 'react'
import { formatCOP } from '../data/products'
import { buildOrderMessage, paymentMethods } from '../data/cart'
import { brand, waLink } from '../data/site'
import { useCart } from '../context/CartContext'
import { IconWhatsApp, IconChevronRight, IconX } from './icons'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

const emptyCustomer = {
  name: '',
  phone: '',
  city: '',
  address: '',
  neighborhood: '',
  notes: '',
  paymentMethod: paymentMethods[0],
}

const FIELDS = [
  { key: 'name', label: 'Nombre completo', type: 'text', autoComplete: 'name' },
  { key: 'phone', label: 'Número de teléfono', type: 'tel', autoComplete: 'tel' },
  { key: 'city', label: 'Ciudad', type: 'text', autoComplete: 'address-level2' },
  { key: 'address', label: 'Dirección', type: 'text', autoComplete: 'street-address' },
  { key: 'neighborhood', label: 'Barrio', type: 'text', autoComplete: 'off' },
]

export default function CheckoutModal() {
  const { items, subtotal, checkoutOpen, closeCheckout, openCart, clearCart, notify } = useCart()
  const [customer, setCustomer] = useState(emptyCustomer)
  const [errors, setErrors] = useState({})
  const panelRef = useRef(null)
  const firstFieldRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!checkoutOpen) return
    setCustomer(emptyCustomer)
    setErrors({})
    previouslyFocused.current = document.activeElement
    firstFieldRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeCheckout()
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
  }, [checkoutOpen, closeCheckout])

  if (!checkoutOpen) return null

  const setField = (key) => (e) => {
    setCustomer((c) => ({ ...c, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: false }))
  }

  const handleBack = () => {
    closeCheckout()
    openCart()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    for (const f of FIELDS) {
      if (!customer[f.key].trim()) nextErrors[f.key] = true
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const firstInvalid = FIELDS.find((f) => nextErrors[f.key])
      panelRef.current?.querySelector(`[name="${firstInvalid.key}"]`)?.focus()
      return
    }

    const message = buildOrderMessage(items, customer)
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
    clearCart()
    closeCheckout()
    notify('Pedido enviado — te contactaremos por WhatsApp para confirmar')
  }

  return (
    <div
      className="fixed inset-0 z-[97] flex items-end justify-center bg-ink-900/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      onClick={closeCheckout}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[94vh] w-full max-w-lg flex-col overflow-y-auto rounded-t-3xl bg-cream-50 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5 sm:px-8">
          <div>
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 font-body text-xs uppercase tracking-wide text-ink-400 hover:text-ink-700"
            >
              <IconChevronRight className="h-3.5 w-3.5 rotate-180" />
              Volver al carrito
            </button>
            <h2 id="checkout-title" className="mt-1.5 font-display text-2xl text-ink-900">
              Finalizar compra
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCheckout}
            aria-label="Cerrar"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-100 text-ink-600 transition-colors hover:bg-cream-200"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-6 py-6 sm:px-8">
          <div className="rounded-2xl border border-ink-100 bg-white p-4">
            <p className="font-body text-xs uppercase tracking-wide text-ink-400">Resumen del pedido</p>
            <ul className="mt-3 space-y-2">
              {items.map((item) => (
                <li key={item.lineId} className="flex items-center justify-between gap-3 font-body text-sm text-ink-600">
                  <span className="min-w-0 truncate">
                    {item.qty} × {item.title}
                  </span>
                  <span className="shrink-0 tabular-nums text-ink-900">{formatCOP(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3">
              <span className="font-display text-sm text-ink-900">Subtotal</span>
              <span className="font-display text-lg text-gold-600 tabular-nums">{formatCOP(subtotal)}</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {FIELDS.map((f, i) => (
              <label key={f.key} className={`flex flex-col gap-1.5 ${f.key === 'address' ? 'sm:col-span-2' : ''}`}>
                <span className="font-body text-xs uppercase tracking-wide text-ink-500">{f.label}</span>
                <input
                  ref={i === 0 ? firstFieldRef : undefined}
                  name={f.key}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  value={customer[f.key]}
                  onChange={setField(f.key)}
                  aria-invalid={errors[f.key] ? 'true' : undefined}
                  className={`h-12 rounded-xl border bg-white px-4 font-body text-sm text-ink-900 outline-none transition-colors focus:border-gold-500 ${
                    errors[f.key] ? 'border-red-400' : 'border-ink-100'
                  }`}
                />
                {errors[f.key] && <span className="font-body text-xs text-red-500">Este campo es obligatorio</span>}
              </label>
            ))}
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="font-body text-xs uppercase tracking-wide text-ink-500">Indicaciones adicionales</span>
            <textarea
              name="notes"
              rows={2}
              value={customer.notes}
              onChange={setField('notes')}
              placeholder="Punto de referencia, horario de entrega, etc. (opcional)"
              className="resize-none rounded-xl border border-ink-100 bg-white px-4 py-3 font-body text-sm text-ink-900 outline-none transition-colors focus:border-gold-500"
            />
          </label>

          <div>
            <span className="font-body text-xs uppercase tracking-wide text-ink-500">Método de pago</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setCustomer((c) => ({ ...c, paymentMethod: method }))}
                  aria-pressed={customer.paymentMethod === method}
                  className={`rounded-full border px-4 py-2.5 font-body text-sm transition-colors ${
                    customer.paymentMethod === method
                      ? 'border-gold-500 bg-gold-50 text-gold-700'
                      : 'border-ink-100 text-ink-600 hover:border-ink-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-ink-100 pt-5">
            <span className="font-display text-base text-ink-900">Total del pedido</span>
            <span className="font-display text-2xl text-gold-600 tabular-nums">{formatCOP(subtotal)}</span>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.01]"
          >
            <IconWhatsApp className="h-4 w-4" />
            Confirmar y enviar por WhatsApp
          </button>
          <p className="-mt-3 text-center font-body text-xs text-ink-400">
            Tu pedido se enviará a {brand.name} por WhatsApp para confirmar disponibilidad y coordinar el envío.
          </p>
        </form>
      </div>
    </div>
  )
}
