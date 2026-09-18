import { Link } from 'react-router-dom'
import { CATEGORIES, formatCOP } from '../data/products'
import { getProductImage } from '../data/productImages'
import { waLink } from '../data/site'
import { useCart, DEFAULT_SIZE_LABEL } from '../context/CartContext'
import { IconBottle, IconBagPlus, IconHeart } from './icons'
import { VALENTINES_ACTIVE } from '../data/campaign'

export default function ProductCard({ product, eager = false }) {
  const { addItem } = useCart()
  const categoryLabel =
    product.category === CATEGORIES.DAMA ? 'Dama' : product.category === CATEGORIES.UNISEX ? 'Unisex' : 'Caballero'
  const sizeLabel = product.sizes?.[0]?.label
  const message = `Hola, Gentleman Co. Estoy interesado/a en comprar el perfume ${product.fullName}${
    sizeLabel ? ` (${sizeLabel})` : ''
  } por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`
  const wa = waLink(message)
  const href = `/perfumes/${product.id}`

  const handleAddToCart = () => {
    addItem(product, { label: product.sizes?.[0]?.label || DEFAULT_SIZE_LABEL, price: product.sizes?.[0]?.price ?? product.price })
  }

  const img = getProductImage(product.image)

  return (
    <article
      className={`group w-44 shrink-0 snap-start overflow-hidden rounded-2xl border bg-white transition-colors duration-200 sm:w-52 lg:w-56 ${
        VALENTINES_ACTIVE
          ? 'border-ink-100 hover:border-wine-200 hover:shadow-[0_10px_28px_-6px_rgba(124,36,48,0.22)]'
          : 'border-ink-100'
      }`}
    >
      <Link to={href} className="relative block aspect-square w-full overflow-hidden bg-cream-50">
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-ink-900/10 bg-ink-900/85 px-2.5 py-1 font-body text-[10px] uppercase tracking-wide text-cream-50">
          {categoryLabel}
        </span>
        {VALENTINES_ACTIVE && (
          <span
            aria-hidden="true"
            className="absolute right-2.5 top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-cream-50/90 text-wine-500 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100"
          >
            <IconHeart className="h-3.5 w-3.5" />
          </span>
        )}

        {product.image ? (
          <picture>
            <source srcSet={img.avif} type="image/avif" />
            <source srcSet={img.webp} type="image/webp" />
            <img
              src={img.jpg}
              alt={`Gentleman Co — ${product.fullName}`}
              className="h-full w-full object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.05]"
              loading={eager ? 'eager' : 'lazy'}
              width={300}
              height={300}
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-500">
            <IconBottle className="h-10 w-10" />
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-1.5 p-4">
        <p className="truncate font-body text-[11px] uppercase tracking-wide text-ink-400">{product.brand}</p>
        <h3 className="line-clamp-2 min-h-[2.4em] font-display text-base leading-snug text-ink-900">
          <Link to={href} className="hover:text-gold-600">
            {product.title}
          </Link>
        </h3>
        <p className="font-display text-lg text-gold-600">
          {formatCOP(product.price)}
          {sizeLabel && <span className="ml-1.5 font-body text-xs text-ink-400">· {sizeLabel}</span>}
        </p>

        <div className="mt-1.5 flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-1 items-center justify-center rounded-full bg-gold-500 font-body text-xs uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.02]"
          >
            Comprar
          </a>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.fullName} al carrito`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-colors duration-200 hover:border-gold-400 hover:bg-gold-500 hover:text-ink-900"
          >
            <IconBagPlus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
