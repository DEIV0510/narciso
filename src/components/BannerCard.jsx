// Tarjeta de una pieza gráfica ya diseñada (banner que manda el cliente)
// envuelta en un enlace a WhatsApp. Todas comparten la proporción 3:2 del
// archivo: así quedan parejas en la fila y la caja reserva su alto antes de
// que cargue la imagen (sin saltos de diseño). `children` = capas
// decorativas encima de la imagen (telaraña, niebla, murciélagos…).
//
// Cada formato recibe [versión de 960 px, versión original de 1536 px]; el
// navegador elige según el ancho real de la tarjeta (ver SIZES). Debe
// coincidir con PromoStrip: dos columnas desde 640 px, contenedor de 72 rem.
const SIZES =
  '(min-width: 1152px) 532px, (min-width: 1024px) calc((100vw - 88px) / 2), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 32px)'

const srcSet = ([small, full]) => `${small} 960w, ${full} 1536w`

export default function BannerCard({ href, alt, avif, webp, jpg, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hw-card block aspect-[3/2] overflow-hidden rounded-2xl border border-gold-500/30 shadow-[0_22px_50px_-26px_rgba(0,0,0,0.95),0_0_50px_-24px_rgba(255,106,0,0.5)] sm:rounded-3xl"
    >
      <picture>
        <source type="image/avif" srcSet={srcSet(avif)} sizes={SIZES} />
        <source type="image/webp" srcSet={srcSet(webp)} sizes={SIZES} />
        <img
          src={jpg[1]}
          srcSet={srcSet(jpg)}
          sizes={SIZES}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          width={1536}
          height={1024}
        />
      </picture>
      {children}
    </a>
  )
}
