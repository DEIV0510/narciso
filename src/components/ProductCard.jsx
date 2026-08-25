import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'
import { CATEGORIES, formatCOP } from '../data/products'
import { waLink } from '../data/site'
import { IconBottle } from './icons'

export default function ProductCard({ product, eager = false }) {
  const isDama = product.category === CATEGORIES.DAMA
  const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${product.fullName} por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-shadow duration-200 hover:shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-50">
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 font-body text-[10px] uppercase tracking-wide shadow-sm ${
            isDama ? 'bg-white/90 text-ink-500' : 'bg-ink-900/85 text-cream-50'
          }`}
        >
          {isDama ? 'Dama' : 'Caballero'}
        </span>

        {product.image ? (
          <picture>
            <source srcSet={catalogAvif} type="image/avif" />
            <source srcSet={catalogWebp} type="image/webp" />
            <img
              src={catalogJpg}
              alt={`Narciso Parfum — ${product.fullName}`}
              className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading={eager ? 'eager' : 'lazy'}
              width={900}
              height={1200}
            />
          </picture>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-300">
            <IconBottle className="h-9 w-9" />
            <span className="font-body text-[11px] uppercase tracking-wide">Foto pendiente</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-body text-[10px] uppercase tracking-wide text-ink-400 sm:text-[11px]">{product.brand}</p>
        <h3 className="mt-0.5 font-display text-base leading-snug text-ink-900 sm:text-lg">{product.title}</h3>
        <p className="mt-2 font-display text-lg text-gold-600 sm:text-xl">{formatCOP(product.price)}</p>

        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 font-body text-xs uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.02] sm:mt-4 sm:text-sm"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </article>
  )
}
