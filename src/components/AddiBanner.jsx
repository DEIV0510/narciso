import addiAvif from '../assets/img/addi-banner.avif'
import addiWebp from '../assets/img/addi-banner.webp'
import addiJpg from '../assets/img/addi-banner.jpg'
import Reveal from './Reveal'
import { waLink } from '../data/site'

// Banner real que envió el cliente anunciando Addi (paga hasta en 3 cuotas)
// como nuevo método de pago — mismo tratamiento que PromoBanner: la pieza ya
// viene diseñada, solo se envuelve en un enlace a WhatsApp para coordinar el
// pedido. "Addi" también queda disponible como opción en el checkout normal
// (ver paymentMethods en data/cart.js).
const message =
  'Hola, Gentleman Co. Vi que ahora puedo pagar con Addi (hasta 3 cuotas, 0% de interés) y quiero hacer mi pedido así.'

export default function AddiBanner() {
  return (
    <section className="bg-cream-50 pb-10 sm:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-[1.75rem] shadow-[0_16px_40px_-16px_rgba(124,36,48,0.35)] transition-transform duration-300 hover:scale-[1.01] sm:rounded-[2rem]"
          >
            <picture>
              <source srcSet={addiAvif} type="image/avif" />
              <source srcSet={addiWebp} type="image/webp" />
              <img
                src={addiJpg}
                alt="Paga tu fragancia Gentleman Co hasta en 3 cuotas con Addi, 0% de interés y aprobación inmediata"
                className="h-full w-full object-cover"
                loading="lazy"
                width={1536}
                height={1024}
              />
            </picture>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
