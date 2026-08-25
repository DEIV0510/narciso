import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'
import { formatCOP } from '../data/products'
import { waLink } from '../data/site'
import { IconBottle, IconWhatsApp } from './icons'

export default function ProductListItem({ product, number, eager = false }) {
  const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${product.fullName} por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`

  return (
    <li className="flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3">
      <span className="w-5 shrink-0 text-right font-display text-xs text-gold-500 tabular-nums sm:text-sm">
        {number}
      </span>

      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream-50 sm:h-14 sm:w-14">
        {product.image ? (
          <picture>
            <source srcSet={catalogAvif} type="image/avif" />
            <source srcSet={catalogWebp} type="image/webp" />
            <img
              src={catalogJpg}
              alt={`Narciso Parfum — ${product.fullName}`}
              className="h-full w-full object-contain p-1"
              loading={eager ? 'eager' : 'lazy'}
              width={112}
              height={112}
            />
          </picture>
        ) : (
          <IconBottle className="h-5 w-5 text-ink-300" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-[10px] uppercase tracking-wide text-ink-400">
          {product.brand}
        </span>
        <span className="block truncate font-display text-sm text-ink-900 sm:text-base">{product.title}</span>
      </span>

      <span className="shrink-0 font-display text-sm text-gold-600 sm:text-base">{formatCOP(product.price)}</span>

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Comprar ${product.fullName} por WhatsApp`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-ink-900 transition-transform duration-200 hover:scale-105"
      >
        <IconWhatsApp className="h-5 w-5" />
      </a>
    </li>
  )
}
