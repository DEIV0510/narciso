import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'
import { CATEGORIES, formatCOP } from '../data/products'
import { waLink } from '../data/site'
import { IconBottle, IconWhatsApp } from './icons'

export default function ProductCard({ product, eager = false }) {
  const isDama = product.category === CATEGORIES.DAMA
  const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${product.fullName} por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`
  const wa = waLink(message)

  return (
    <article className="group w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-50/10 bg-ink-800 sm:w-44">
      <div className="relative aspect-square w-full overflow-hidden bg-ink-900">
        <span className="absolute left-2 top-2 z-10 rounded-full border border-cream-50/15 bg-ink-900/70 px-2 py-0.5 font-body text-[9px] uppercase tracking-wide text-cream-100">
          {isDama ? 'Dama' : 'Caballero'}
        </span>

        {product.image ? (
          <picture>
            <source srcSet={catalogAvif} type="image/avif" />
            <source srcSet={catalogWebp} type="image/webp" />
            <img
              src={catalogJpg}
              alt={`Narciso Parfum — ${product.fullName}`}
              className="h-full w-full object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.05]"
              loading={eager ? 'eager' : 'lazy'}
              width={300}
              height={300}
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-500">
            <IconBottle className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 p-3">
        <p className="truncate font-body text-[10px] uppercase tracking-wide text-ink-300">{product.brand}</p>
        <h3 className="line-clamp-2 min-h-[2.2em] font-display text-sm leading-snug text-cream-50">
          {product.title}
        </h3>
        <p className="font-display text-base text-gold-400">{formatCOP(product.price)}</p>

        <div className="mt-1 flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-gold-500 font-body text-[11px] uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.02]"
          >
            Comprar
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Comprar ${product.fullName} por WhatsApp`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-ink-900 transition-transform duration-200 hover:scale-105"
          >
            <IconWhatsApp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}
