import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'
import { CATEGORIES, formatCOP } from '../data/products'
import { waLink } from '../data/site'
import { IconBottle, IconWhatsApp } from './icons'

export default function ProductGridItem({ product, eager = false }) {
  const isDama = product.category === CATEGORIES.DAMA
  const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${product.fullName} por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-ink-100 bg-white transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-cream-50">
        <span
          className={`absolute left-1.5 top-1.5 z-10 rounded-full px-1.5 py-0.5 font-body text-[8px] uppercase tracking-wide shadow-sm sm:text-[9px] ${
            isDama ? 'bg-white/90 text-ink-500' : 'bg-ink-900/85 text-cream-50'
          }`}
        >
          {isDama ? 'Dama' : 'Cab.'}
        </span>

        {product.image ? (
          <picture>
            <source srcSet={catalogAvif} type="image/avif" />
            <source srcSet={catalogWebp} type="image/webp" />
            <img
              src={catalogJpg}
              alt={`Narciso Parfum — ${product.fullName}`}
              className="h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-[1.04]"
              loading={eager ? 'eager' : 'lazy'}
              width={300}
              height={300}
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-300">
            <IconBottle className="h-6 w-6" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2 sm:p-2.5">
        <p className="line-clamp-2 font-display text-[11px] leading-tight text-ink-900 sm:text-xs">{product.title}</p>
        <p className="mt-1 font-display text-xs text-gold-600 sm:text-sm">{formatCOP(product.price)}</p>

        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Comprar ${product.fullName} por WhatsApp`}
          className="mt-1.5 flex h-11 items-center justify-center rounded-full bg-[#25D366] text-ink-900 transition-transform duration-200 hover:scale-105"
        >
          <IconWhatsApp className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}
