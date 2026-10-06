import promoAvif from '../assets/img/promo-especial.avif'
import promoWebp from '../assets/img/promo-especial.webp'
import promoJpg from '../assets/img/promo-especial.jpg'
import Reveal from './Reveal'
import { waLink } from '../data/site'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

// Banner real de promoción que envió el cliente (elige 3 fragancias por
// $130.000 COP) — se muestra como pieza gráfica ya diseñada, envuelta en un
// enlace a WhatsApp. No se inventa lógica de descuento en el carrito: el
// mensaje solo abre la conversación para coordinar el combo.
export default function PromoBanner() {
  if (!HALLOWEEN_ACTIVE) return null

  const message =
    'Hola, Gentleman Co. Vi la promoción especial (elige 3 fragancias por $130.000 COP) y quiero armar mi combo.'

  return (
    <section className="bg-night-900 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-card block overflow-hidden rounded-[1.75rem] border border-gold-500/25 shadow-[0_26px_60px_-28px_rgba(0,0,0,0.95),0_0_60px_-28px_rgba(233,138,60,0.45)] sm:rounded-[2rem]"
          >
            <picture>
              <source srcSet={promoAvif} type="image/avif" />
              <source srcSet={promoWebp} type="image/webp" />
              <img
                src={promoJpg}
                alt={halloweenCopy.promoImageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
                width={1600}
                height={1067}
              />
            </picture>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
