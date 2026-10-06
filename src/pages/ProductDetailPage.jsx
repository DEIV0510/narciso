import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
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
import { getProductImage } from '../data/productImages'
import { getFragranceInfo } from '../data/fragranceInfo'
import { waLink } from '../data/site'
import { useCart, DEFAULT_SIZE_LABEL } from '../context/CartContext'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { IconWhatsApp, IconBagPlus, IconFlame } from '../components/icons'
import { Embers } from '../components/HalloweenFx'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

// La primera foto (principal) es la real de ESTE producto (ver
// data/productImages.js); las otras 3 son recortes reales del mismo frasco
// físico compartido por toda la colección (source-material/
// botella-oficial-ambiente.png), iguales para todos los productos.
function buildGallery(product) {
  const principal = getProductImage(product.image)
  return [
    { key: 'principal', ...principal, alt: 'Frasco de Gentleman Co' },
    { key: 'vista', avif: spotlightAvif, webp: spotlightWebp, jpg: spotlightJpg, alt: 'Gentleman Co sobre madera' },
    { key: 'detalle', avif: labelAvif, webp: labelWebp, jpg: labelJpg, alt: 'Detalle de la etiqueta de Gentleman Co' },
    { key: 'presentacion', avif: heroAvif, webp: heroWebp, jpg: heroJpg, alt: 'Gentleman Co junto a la colección' },
  ]
}

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
  const categoryLabel =
    product.category === CATEGORIES.DAMA ? 'Dama' : product.category === CATEGORIES.UNISEX ? 'Unisex' : 'Caballero'
  const related = getRelatedProducts(product, 4)
  const sizes = product.sizes || [{ label: DEFAULT_SIZE_LABEL, price: product.price }]
  const size = selectedSize || sizes[0]
  const message = `Hola, Gentleman Co. Estoy interesado/a en ${product.fullName}${
    size.label !== DEFAULT_SIZE_LABEL ? ` (${size.label})` : ''
  } por $${size.price.toLocaleString('es-CO')} COP. ¿Me pueden confirmar disponibilidad?`

  const handleAddToCart = () => addItem(product, size)

  const gallery = buildGallery(product)

  useDocumentMeta({
    title: `${product.title} | Gentleman Co`,
    description: `${product.title}, fragancia inspirada de Gentleman Co (${product.category}). ${formatCOP(product.price)}. Elaborada en Ibagué, Tolima — compra por WhatsApp.`,
    path: `/perfumes/${product.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Gentleman Co — ${product.title}`,
      image: `${window.location.origin}${gallery[0].jpg}`,
      description: `Fragancia inspirada, ${product.category.toLowerCase()}.`,
      brand: { '@type': 'Brand', name: 'Gentleman Co' },
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
    <div className="relative bg-night-900 pb-16 pt-6 sm:pb-24 sm:pt-8">
      {HALLOWEEN_ACTIVE && (
        <div aria-hidden="true" className="hw-glow-top pointer-events-none absolute inset-x-0 top-0 h-72" />
      )}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Perfumería', to: '/#catalogo' },
            { label: categoryLabel, to: '/#catalogo' },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Móvil: foto primero. Desktop: foto a la derecha (order-2). */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-ink-900 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.95),0_0_70px_-32px_rgba(233,138,60,0.4)]">
                  {HALLOWEEN_ACTIVE && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(233,138,60,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(180,134,58,0.1),transparent_55%)]"
                    />
                  )}
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
              </Reveal>
              {HALLOWEEN_ACTIVE && <Embers density="light" className="rounded-3xl" />}
            </div>
            <Reveal className="mt-3 flex gap-2">
              {gallery.map((g, i) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagen: ${g.alt}`}
                  aria-pressed={active === i}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-ink-900 transition-colors sm:h-20 sm:w-20 ${
                    active === i ? 'border-gold-400' : 'border-gold-500/20 hover:border-gold-500/50'
                  }`}
                >
                  <img src={g.jpg} alt="" className="h-full w-full object-contain p-1.5" />
                </button>
              ))}
            </Reveal>
          </div>

          {/* Móvil: nombre/precio/CTA justo después de la foto. */}
          <Reveal delay={80} className="order-2 lg:order-1">
            <p className="section-eyebrow text-gold-400">{product.category}</p>
            <h1 className="hw-glow-text mt-2 font-display text-3xl leading-tight text-cream-50 sm:text-4xl">{product.title}</h1>
            <p className="mt-1 font-body text-sm text-ink-300">Inspirado en {product.brand}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {info?.family && (
                <span className="inline-flex w-fit items-center rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 font-body text-[11px] uppercase tracking-wide text-gold-200">
                  Familia olfativa: {info.family}
                </span>
              )}
              {HALLOWEEN_ACTIVE && (
                <span className="inline-flex w-fit items-center gap-1 rounded-full border border-ember-400/30 bg-ember-500/10 px-3 py-1 font-body text-[11px] uppercase tracking-wide text-ember-300">
                  <IconFlame className="h-3 w-3" />
                  {halloweenCopy.giftBadge}
                </span>
              )}
            </div>

            {info?.profile ? (
              <p className="mt-4 font-body text-base leading-relaxed text-cream-200/75">{info.profile}</p>
            ) : (
              <p className="mt-4 font-body text-base leading-relaxed text-cream-200/75">
                Una fragancia inspirada de Gentleman Co, elaborada en Ibagué, Tolima.
              </p>
            )}

            <div className="mt-6 border-t border-gold-500/15 pt-6">
              {sizes.length > 1 ? (
                <>
                  <p className="font-body text-xs uppercase tracking-wide text-ink-300">Elige tu presentación</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        aria-pressed={size.label === s.label}
                        className={`rounded-full border px-4 py-2 font-body text-sm transition-colors ${
                          size.label === s.label
                            ? 'border-gold-400 bg-gold-500/15 text-gold-200'
                            : 'border-gold-500/25 text-cream-200/85 hover:border-gold-400/60'
                        }`}
                      >
                        {s.label} · {formatCOP(s.price)}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="font-display text-3xl text-gold-300">{formatCOP(product.price)}</p>
                  {size.label !== DEFAULT_SIZE_LABEL && (
                    <p className="mt-1 font-body text-sm text-ink-300">{size.label}</p>
                  )}
                </>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="hw-btn-glow flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-4 font-body text-sm uppercase tracking-wide text-night-950 hover:scale-[1.01] hover:bg-gold-400 sm:w-fit sm:px-10"
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
              <div className="mt-8 border-t border-gold-500/15 pt-6">
                <p className="font-display text-lg text-cream-50">Perfil olfativo</p>
                <div className="mt-3 space-y-2.5 font-body text-sm text-cream-200/75">
                  {info.topNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-gold-200">Salida —</span> {info.topNotes.join(' · ')}
                    </p>
                  )}
                  {info.heartNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-gold-200">Corazón —</span> {info.heartNotes.join(' · ')}
                    </p>
                  )}
                  {info.baseNotes?.length > 0 && (
                    <p>
                      <span className="font-medium text-gold-200">Fondo —</span> {info.baseNotes.join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {(info?.occasions?.length || info?.season?.length || info?.timeOfDay?.length) && (
              <div className="mt-8 border-t border-gold-500/15 pt-6">
                <p className="font-display text-lg text-cream-50">¿Cuándo usarlo?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[...(info.occasions || []), ...(info.timeOfDay || []), ...(info.season || [])].map((tag, i) => (
                    <span
                      key={`${tag}-${i}`}
                      className="rounded-full border border-gold-500/20 bg-night-800 px-3 py-1.5 font-body text-xs text-cream-200/85"
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
          <Reveal delay={120} className="mt-16 border-t border-gold-500/15 pt-10 sm:mt-20">
            <p className="font-display text-xl text-cream-50 sm:text-2xl">También podría gustarte</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p) => {
                const relatedImg = getProductImage(p.image)
                return (
                  <Link
                    key={p.id}
                    to={`/perfumes/${p.id}`}
                    className="hw-card group overflow-hidden rounded-2xl border border-gold-500/20 bg-night-800 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)]"
                  >
                    <span className="block aspect-square w-full bg-ink-900">
                      <picture>
                        <source srcSet={relatedImg.avif} type="image/avif" />
                        <source srcSet={relatedImg.webp} type="image/webp" />
                        <img
                          src={relatedImg.jpg}
                          alt={p.fullName}
                          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          width={200}
                          height={200}
                        />
                      </picture>
                    </span>
                    <span className="block p-3">
                      <span className="line-clamp-2 block font-display text-sm text-cream-50">{p.title}</span>
                      <span className="mt-1 block font-display text-sm text-gold-300">{formatCOP(p.price)}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}
