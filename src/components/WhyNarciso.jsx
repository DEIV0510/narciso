import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import Reveal from './Reveal'
import { whyNarciso, waLink, waMessages } from '../data/site'
import { IconCheck } from './icons'

export default function WhyNarciso() {
  return (
    <section aria-labelledby="why-heading" className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <div className="grid grid-cols-[1fr_auto] items-center gap-6">
            <ul className="space-y-3.5">
              {whyNarciso.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-body text-sm text-ink-700 sm:text-base">
                  <IconCheck className="h-4 w-4 shrink-0 text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="hidden w-28 shrink-0 overflow-hidden rounded-2xl sm:block">
              <picture>
                <source srcSet={labelAvif} type="image/avif" />
                <source srcSet={labelWebp} type="image/webp" />
                <img
                  src={labelJpg}
                  alt="Detalle de la etiqueta de Narciso Parfum"
                  className="aspect-[3/4] h-full w-full object-cover"
                  loading="lazy"
                  width={300}
                  height={400}
                />
              </picture>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="section-eyebrow text-gold-600">¿Por qué Narciso?</p>
          <h2 id="why-heading" className="mt-3 font-display text-3xl text-balance text-ink-900 sm:text-4xl">
            Calidad que se siente real.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-500 sm:text-lg">
            Todo lo que buscas en una fragancia inspirada: presentación cuidada, aroma que
            perdura y atención personalizada, sin complicaciones. Eso es Narciso Parfum.
          </p>
          <a
            href={waLink(waMessages.catalog)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-ink-900 px-8 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 transition-transform duration-200 hover:scale-[1.02]"
          >
            Comprar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
