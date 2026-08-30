import { Link } from 'react-router-dom'
import { CATEGORIES, formatCOP } from '../data/products'
import { getProductImage } from '../data/productImages'
import { waLink } from '../data/site'
import { useCart, DEFAULT_SIZE_LABEL } from '../context/CartContext'
import { IconBottle, IconBagPlus } from './icons'

export default function ProductCard({ product, eager = false }) {
  const { addItem } = useCart()
  const categoryLabel =
    product.category === CATEGORIES.DAMA ? 'Dama' : product.category === CATEGORIES.UNISEX ? 'Unisex' : 'Caballero'
  const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${product.fullName} por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`
  const wa = waLink(message)
  const href = `/perfumes/${product.id}`

  const handleAddToCart = () => {
    addItem(product, { label: product.sizes?.[0]?.label || DEFAULT_SIZE_LABEL, price: product.sizes?.[0]?.price ?? product.price })
  }

  const img = getProductImage(product.image)

  return (
    <article className="group w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-ink-100 bg-white sm:w-52 lg:w-56">
      <Link to={href} className="relative block aspect-square w-full overflow-hidden bg-cream-50">
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full border border-ink-900/10 bg-ink-900/85 px-2.5 py-1 font-body text-[10px] uppercase tracking-wide text-cream-50">
          {categoryLabel}
        </span>

        {product.image ? (
          <picture>
            <source srcSet={img.avif} type="image/avif" />
            <source srcSet={img.webp} type="image/webp" />
            <img
              src={img.jpg}
              alt={`Narciso Parfum — ${product.fullName}`}
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
        <p className="font-display text-lg text-gold-600">{formatCOP(product.price)}</p>

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
