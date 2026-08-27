import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import catalogAvif from '../assets/img/catalog-bottle.avif'
import catalogWebp from '../assets/img/catalog-bottle.webp'
import catalogJpg from '../assets/img/catalog-bottle.jpg'
import spotlightAvif from '../assets/img/spotlight-bottle.avif'
import spotlightWebp from '../assets/img/spotlight-bottle.webp'
import spotlightJpg from '../assets/img/spotlight-bottle.jpg'
import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import Breadcrumbs from '../components/Breadcrumbs'
import Reveal from '../components/Reveal'
import { CATEGORIES, formatCOP, getProductById, getRelatedProducts } from '../data/products'
import { getFragranceInfo } from '../data/fragranceInfo'
import { waLink } from '../data/site'
import { useCart, DEFAULT_SIZE_LABEL } from '../context/CartContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { IconWhatsApp, IconBagPlus } from '../components/icons'

const gallery = [
  { key: 'principal', avif: catalogAvif, webp: catalogWebp, jpg: catalogJpg, alt: 'Frasco de Narciso Parfum' },
  { key: 'vista', avif: spotlightAvif, webp: spotlightWebp, jpg: spotlightJpg, alt: 'Narciso Parfum sobre madera' },
  { key: 'detalle', avif: labelAvif, webp: labelWebp, jpg: labelJpg, alt: 'Detalle de la etiqueta de Narciso Parfum' },
  { key: 'presentacion', avif: heroAvif, webp: heroWebp, jpg: heroJpg, alt: 'Narciso Parfum junto a la colección' },
]

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = getProductById(slug)
  const [active, setActive] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const { addItem } = useCart()

  if (!product) {
    return <Navigate to="/" replace />
  }

  const info = getFragranceInfo(product.id)
  const isDama = product.category === CATEGORIES.DAMA
  const related = getRelatedProducts(product, 4)
  const sizes = product.sizes || [{ label: DEFAULT_SIZE_LABEL, price: product.price }]
  const size = selectedSize || sizes[0]
  const message = `Hola, Narciso Parfum. Estoy interesado/a en ${product.fullName}${
    size.label !== DEFAULT_SIZE_LABEL ? ` (${size.label})` : ''
  } por $${size.price.toLocaleString('es-CO')} COP. ¿Me pueden confirmar disponibilidad?`

  const handleAddToCart = () => addItem(product, size)

  useDocumentMeta({
    title: `${product.title} | Narciso Parfum`,
    description: `${product.title}, fragancia inspirada de Narciso Parfum (${product.category}). ${formatCOP(product.price)}. Elaborada en Ibagué, Tolima — compra por WhatsApp.`,
    path: `/perfumes/${product.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Narciso Parfum — ${product.title}`,
      image: `${window.location.origin}${catalogJpg}`,
      description: `Fragancia inspirada, ${product.category.toLowerCase()}.`,
      brand: { '@type': 'Brand', name: 'Narciso Parfum' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'COP',
        price: product.price,
        url: `${window.location.origin}/perfumes/${product.id}`,
      },
    },
  })

  const current = gallery[active]

  return (
    <div className="bg-cream-50 pb-16 pt-6 sm:pb-24 sm:pt-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Perfumería', to: '/#catalogo' },
            { label: isDama ? 'Dama' : 'Caballero', to: '/#catalogo' },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Móvil: foto primero. Desktop: foto a la derecha (order-2). */}
          <Reveal className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-3xl bg-white">
              <picture>
                <source srcSet={current.avif} type="image/avif" />
                <source srcSet={current.webp} type="image/webp" />
                <img
                  src={current.jpg}
                  alt={`${current.alt} — ${product.fullName}`}
                  className="aspect-square w-full object-contain p-8 sm:p-10"
                  loading="eager"
                  fetchpriority="high"
                  width={900}
                  height={900}
                />
              </picture>
            </div>
            <div className="mt-3 flex gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagen: ${g.alt}`}
                  aria-pressed={active === i}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-colors sm:h-20 sm:w-20 ${
                    active === i ? 'border-gold-500' : 'border-ink-100'
                  }`}
                >
                  <img src={g.jpg} alt="" className="h-full w-full object-contain p-1.5" />
                </button>
              ))}
            </div>
          </Reveal>

          {/* Móvil: nombre/precio/CTA justo después de la foto. */}
          <Reveal delay={80} className="order-2 lg:order-1">
            <p className="section-eyebrow text-gold-600">{product.category}</p>
            <h1 className="mt-2 font-display text-3xl leading-tight text-ink-900 sm:text-4xl">{product.title}</h1>
            <p className="mt-1 font-body text-sm text-ink-400">Inspirado en {product.brand}</p>

            {info?.family && (
              <span className="mt-4 inline-flex w-fit items-center rounded-full bg-gold-50 px-3 py-1 font-body text-[11px] uppercase tracking-wide text-gold-700">
                Familia olfativa: {info.family}
              </span>
            )}

            {info?.profile ? (
              <p className="mt-4 font-body text-base leading-relaxed text-ink-500">{info.profile}</p>
            ) : (
              <p className="mt-4 font-body text-base leading-relaxed text-ink-500">
                Una fragancia inspirada de Narciso Parfum, elaborada en Ibagué, Tolima.
              </p>
            )}

            <div className="mt-6 border-t border-ink-100 pt-6">
              {sizes.length > 1 ? (
                <>
                  <p className="font-body text-xs uppercase tracking-wide text-ink-400">Elige tu presentación</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        aria-pressed={size.label === s.label}
                        className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                          size.label === s.label
                            ? 'border-gold-500 bg-gold-50 text-gold-700'
                            : 'border-ink-200 text-ink-700 hover:border-ink-300'
                        }`}
                      >
                        {s.label} · {formatCOP(s.price)}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-display text-3xl text-gold-600">{formatCOP(product.price)}</p>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-4 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.01] hover:bg-gold-400 sm:w-fit sm:px-10"
                >
                  <IconBagPlus className="h-4 w-4" />
                  Agregar al carrito
                </button>

                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.01] sm:w-fit sm:px-10"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Comprar por WhatsApp
                </a>
              </div>
            </div>

            {(info?.topNotes?.length || info?.heartNotes?.length || info?.baseNotes?.length) && (
              <div className="mt-8 border-t border-ink-100 pt-6">
                <p className="font-display text-lg text-ink-900">Perfil olfativo</p>
                <div className="mt-3 space-y-2.5 font-body text-sm text-ink-500">
                  {info.topNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-ink-700">Salida —</span> {info.topNotes.join(' · ')}
                    </p>
                  )}
                  {info.heartNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-ink-700">Corazón —</span> {info.heartNotes.join(' · ')}
                    </p>
                  )}
                  {info.baseNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-ink-700">Fondo —</span> {info.baseNotes.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {(info?.occasions?.length || info?.season?.length || info?.timeOfDay?.length) && (
              <div className="mt-8 border-t border-ink-100 pt-6">
                <p className="font-display text-lg text-ink-900">¿Cuándo usarlo?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...(info.occasions || []), ...(info.timeOfDay || []), ...(info.season || [])].map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-full border border-ink-100 bg-white px-3 py-1.5 font-body text-xs text-ink-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        </div>

        {related.length > 0 && (
          <Reveal delay={120} className="mt-16 border-t border-ink-100 pt-10 sm:mt-20">
            <p className="font-display text-xl text-ink-900 sm:text-2xl">También podría gustarte</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/perfumes/${p.id}`}
                  className="group overflow-hidden rounded-2xl border border-ink-100 bg-white transition-shadow hover:shadow-md"
                >
                  <span className="block aspect-square w-full bg-cream-50">
                    <picture>
                      <source srcSet={catalogAvif} type="image/avif" />
                      <source srcSet={catalogWebp} type="image/webp" />
                      <img
                        src={catalogJpg}
                        alt={p.fullName}
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width={200}
                        height={200}
                      />
                    </picture>
                  </span>
                  <span className="block p-3">
                    <span className="line-clamp-2 block font-display text-sm text-ink-900">{p.title}</span>
                    <span className="mt-1 block font-display text-sm text-gold-600">{formatCOP(p.price)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}
