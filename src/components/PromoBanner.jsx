import promoAvif from '../assets/img/promo-especial.avif'
import promoWebp from '../assets/img/promo-especial.webp'
import promoJpg from '../assets/img/promo-especial.jpg'
import Reveal from './Reveal'
import { waLink } from '../data/site'
import { VALENTINES_ACTIVE, valentinesCopy } from '../data/campaign'

// Banner real de promoción que envió el cliente (elige 3 fragancias por
// $130.000 COP) — se muestra como pieza gráfica ya diseñada, envuelta en un
// enlace a WhatsApp. No se inventa lógica de descuento en el carrito: el
// mensaje solo abre la conversación para coordinar el combo.
export default function PromoBanner() {
  if (!VALENTINES_ACTIVE) return null

  const message =
    'Hola, Gentleman Co. Vi la promoción especial de San Valentín (elige 3 fragancias por $130.000 COP) y quiero armar mi combo.'

  return (
    <section className="bg-cream-50 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[1.75rem] shadow-[0_16px_40px_-16px_rgba(124,36,48,0.35)] transition-transform duration-300 hover:scale-[1.01] sm:rounded-[2rem]"
          >
            <picture>
              <source srcSet={promoAvif} type="image/avif" />
              <source srcSet={promoWebp} type="image/webp" />
              <img
                src={promoJpg}
                alt={valentinesCopy.promoImageAlt}
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
