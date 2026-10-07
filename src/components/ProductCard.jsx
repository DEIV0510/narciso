import { Link } from 'react-router-dom'
import { CATEGORIES, formatCOP } from '../data/products'
import { getProductImage } from '../data/productImages'
import { waLink } from '../data/site'
import { useCart, DEFAULT_SIZE_LABEL } from '../context/CartContext'
import { IconBottle, IconBagPlus, IconFlame, IconRose, IconMoon } from './icons'
import { Cobweb } from './HalloweenArt'
import AddiOption from './AddiOption'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

// Mini icono de temporada por categoría (misma noche que GenderFinder).
const CATEGORY_ICON = { Caballero: IconFlame, Dama: IconRose, Unisex: IconMoon }

// `web` = telaraña pequeña en la esquina de la foto (Catalog la pone en una
// de cada tres tarjetas para que no se repita en todas).
export default function ProductCard({ product, eager = false, web = false }) {
  const { addItem } = useCart()
  const categoryLabel =
    product.category === CATEGORIES.DAMA ? 'Dama' : product.category === CATEGORIES.UNISEX ? 'Unisex' : 'Caballero'
  const sizeLabel = product.sizes?.[0]?.label
  const message = `Hola, Gentleman Co. Estoy interesado/a en comprar el perfume ${product.fullName}${
    sizeLabel ? ` (${sizeLabel})` : ''
  } por $${product.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`
  const wa = waLink(message)
  const href = `/perfumes/${product.id}`
  const CategoryIcon = CATEGORY_ICON[categoryLabel]

  const handleAddToCart = () => {
    addItem(product, { label: product.sizes?.[0]?.label || DEFAULT_SIZE_LABEL, price: product.sizes?.[0]?.price ?? product.price })
  }

  const img = getProductImage(product.image)

  return (
    <article className="hw-card group w-44 shrink-0 snap-start overflow-hidden rounded-2xl border border-gold-500/25 bg-night-800 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.95)] sm:w-52 lg:w-56">
      <Link
        to={href}
        className={`relative block aspect-square w-full overflow-hidden ${
          HALLOWEEN_ACTIVE
            ? 'bg-[radial-gradient(70%_58%_at_50%_74%,rgba(255,106,0,0.17),transparent_70%),linear-gradient(180deg,#131211,#080808)]'
            : 'bg-ink-900'
        }`}
      >
        {HALLOWEEN_ACTIVE && (
          <>
            <span className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-ember-500/55 to-transparent" />
            {web && <Cobweb corner="tr" dew={false} className="absolute right-0 top-0 z-10 w-14 text-cream-200/30" />}
          </>
        )}
        <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full border border-gold-500/30 bg-night-950/85 px-2.5 py-1 font-body text-[10px] uppercase tracking-wide text-cream-50">
          {HALLOWEEN_ACTIVE && <CategoryIcon className="h-3 w-3 text-ember-400" />}
          {categoryLabel}
        </span>

        {product.image ? (
          <picture>
            <source srcSet={img.avif} type="image/avif" />
            <source srcSet={img.webp} type="image/webp" />
            <img
              src={img.jpg}
              alt={`Gentleman Co — ${product.fullName}`}
              className="h-full w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              loading={eager ? 'eager' : 'lazy'}
              width={300}
              height={300}
            />
          </picture>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-300">
            <IconBottle className="h-10 w-10" />
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-1.5 p-4">
        <p className="truncate font-body text-[11px] uppercase tracking-wide text-ink-300">{product.brand}</p>
        <h3 className="line-clamp-2 min-h-[2.4em] font-display text-base leading-snug text-cream-50">
          <Link to={href} className="transition-colors hover:text-gold-300">
            {product.title}
          </Link>
        </h3>
        <p className="font-display text-lg text-gold-300">
          {formatCOP(product.price)}
          {sizeLabel && <span className="ml-1.5 font-body text-xs text-ink-300">· {sizeLabel}</span>}
        </p>

        <div className="mt-1.5 flex items-center gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-btn-glow flex h-11 flex-1 items-center justify-center rounded-full bg-gold-500 font-body text-xs font-medium uppercase tracking-wide text-night-950 hover:scale-[1.02] hover:bg-gold-400"
          >
            Comprar
          </a>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.fullName} al carrito`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/35 text-cream-100 transition-colors duration-200 hover:border-ember-500 hover:bg-ember-500 hover:text-night-950"
          >
            <IconBagPlus className="h-4 w-4" />
          </button>
        </div>
        <AddiOption name={product.fullName} price={product.price} sizeLabel={sizeLabel} />
      </div>
    </article>
  )
}
