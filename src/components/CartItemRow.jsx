import { useState } from 'react'
import { formatCOP } from '../data/products'
import { getProductImage } from '../data/productImages'
import { DEFAULT_SIZE_LABEL, useCart } from '../context/CartContext'
import { IconMinus, IconPlus, IconTrash } from './icons'

export default function CartItemRow({ item }) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const [leaving, setLeaving] = useState(false)
  const img = getProductImage(item.image)

  const leaveThenRemove = () => {
    setLeaving(true)
    setTimeout(() => removeItem(item.lineId), 220)
  }

  const handleDecrement = () => {
    if (item.qty <= 1) {
      leaveThenRemove()
      return
    }
    decrementItem(item.lineId)
  }

  return (
    <li
      className={`flex gap-4 py-5 transition-all duration-200 ease-out ${
        leaving ? 'pointer-events-none -translate-x-2 opacity-0' : 'opacity-100'
      }`}
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(70%_60%_at_50%_72%,rgba(255,106,0,0.16),transparent_70%),linear-gradient(180deg,#131211,#080808)] ring-1 ring-gold-500/25">
        <picture>
          <source srcSet={img.avif} type="image/avif" />
          <source srcSet={img.webp} type="image/webp" />
          <img
            src={img.jpg}
            alt={item.fullName}
            className="h-full w-full object-contain p-1"
            loading="lazy"
            width={80}
            height={80}
          />
        </picture>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {item.category && (
              <p className="truncate font-body text-[10px] uppercase tracking-wide text-ink-300">{item.category}</p>
            )}
            <p className="mt-0.5 line-clamp-2 font-display text-sm text-cream-50">{item.title}</p>
            {item.sizeLabel && item.sizeLabel !== DEFAULT_SIZE_LABEL && (
              <p className="mt-0.5 font-body text-xs text-ink-300">{item.sizeLabel}</p>
            )}
          </div>
          <button
            type="button"
            onClick={leaveThenRemove}
            aria-label={`Eliminar ${item.fullName} del carrito`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-night-700 hover:text-cream-100"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-full border border-gold-500/25 px-1 py-1">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Disminuir cantidad"
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-200 transition-colors hover:bg-ember-500 hover:text-night-950"
            >
              <IconMinus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[1.25rem] text-center font-body text-sm tabular-nums text-cream-50">{item.qty}</span>
            <button
              type="button"
              onClick={() => incrementItem(item.lineId)}
              aria-label="Aumentar cantidad"
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-200 transition-colors hover:bg-ember-500 hover:text-night-950"
            >
              <IconPlus className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="font-display text-sm tabular-nums text-gold-300 transition-all duration-200">
            {formatCOP(item.price * item.qty)}
          </p>
        </div>
      </div>
    </li>
  )
}
