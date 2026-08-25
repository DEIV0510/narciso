import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import Reveal from './Reveal'

export default function BrandSection() {
  return (
    <section aria-labelledby="brand-heading" className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className="order-2 mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-lg lg:order-1 lg:max-w-md">
          <picture>
            <source srcSet={labelAvif} type="image/avif" />
            <source srcSet={labelWebp} type="image/webp" />
            <img
              src={labelJpg}
              alt="Detalle de la etiqueta de Narciso Parfum con la corona y laureles dorados"
              className="aspect-[4/5] h-full w-full object-cover"
              loading="lazy"
              width={800}
              height={1000}
            />
          </picture>
        </Reveal>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="section-eyebrow text-gold-600">Nuestra esencia</p>
          <h2 id="brand-heading" className="mt-3 font-display text-3xl text-ink-900 sm:text-4xl text-balance">
            Más que una fragancia.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-500 sm:text-lg">
            En Narciso Parfum nos especializamos en perfumería inspirada de alta calidad,
            seleccionada para quienes buscan aromas sofisticados, elegantes y memorables.
          </p>
          <p className="mt-4 font-body text-sm text-ink-500">
            Elaborado en Ibagué, Tolima.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
