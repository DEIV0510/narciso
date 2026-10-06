import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import Reveal from './Reveal'

export default function BrandSection() {
  return (
    <section aria-labelledby="brand-heading" className="hw-top-line relative bg-night-850 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-gold-500/25 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95),0_0_60px_-28px_rgba(233,138,60,0.4)] lg:order-1 lg:max-w-md">
          <picture>
            <source srcSet={labelAvif} type="image/avif" />
            <source srcSet={labelWebp} type="image/webp" />
            <img
              src={labelJpg}
              alt="Detalle de la etiqueta de Gentleman Co con la corona y laureles dorados"
              className="aspect-[4/5] h-full w-full object-cover"
              loading="lazy"
              width={800}
              height={1000}
            />
          </picture>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="section-eyebrow text-gold-400">Nuestra esencia</p>
          <h2 id="brand-heading" className="mt-3 font-display text-3xl text-cream-50 sm:text-4xl text-balance">
            Más que una fragancia.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-cream-200/75 sm:text-lg">
            En Gentleman Co nos especializamos en perfumería inspirada de alta calidad,
            seleccionada para quienes buscan aromas sofisticados, elegantes y memorables.
          </p>
          <p className="mt-4 font-body text-sm text-ink-300">
            Elaborado en Ibagué, Tolima.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
