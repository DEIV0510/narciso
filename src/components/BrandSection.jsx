import labelAvif from '../assets/img/label-detail.avif'
import labelWebp from '../assets/img/label-detail.webp'
import labelJpg from '../assets/img/label-detail.jpg'
import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { Embers } from './HalloweenFx'
import { Rose } from './HalloweenArt'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

export default function BrandSection() {
  return (
    <section
      aria-labelledby="brand-heading"
      className={`relative overflow-hidden bg-night-950 py-16 sm:py-24 ${HALLOWEEN_ACTIVE ? 'pt-24 sm:pt-28' : 'hw-top-line'}`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <SectionDivider icon="rose" />
          <div aria-hidden="true" className="hw-glow-burgundy pointer-events-none absolute inset-0 opacity-70" />
          <Embers density="light" />
        </>
      )}
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 mx-auto w-full max-w-sm lg:order-1 lg:max-w-md">
          <Reveal
            className={`overflow-hidden border border-gold-500/30 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95),0_0_60px_-28px_rgba(255,106,0,0.45)] ${
              HALLOWEEN_ACTIVE ? 'hw-arch rounded-b-3xl' : 'rounded-3xl'
            }`}
          >
            <picture>
              <source srcSet={labelAvif} type="image/avif" />
              <source srcSet={labelWebp} type="image/webp" />
              <img
                src={labelJpg}
                alt="Detalle de la etiqueta de Gentleman Co con la corona y laureles dorados"
                className={`aspect-[4/5] h-full w-full object-cover ${
                  HALLOWEEN_ACTIVE ? '[filter:brightness(0.85)_contrast(1.06)]' : ''
                }`}
                loading="lazy"
                width={800}
                height={1000}
              />
            </picture>
          </Reveal>
          {HALLOWEEN_ACTIVE && (
            <>
              <Rose className="absolute -bottom-6 -left-6 h-32 w-auto -rotate-[20deg] sm:h-40" />
              <Rose className="absolute -bottom-8 left-12 h-24 w-auto rotate-[10deg] sm:h-28" />
            </>
          )}
        </div>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="section-eyebrow text-gold-400">Nuestra esencia</p>
          <h2 id="brand-heading" className="hw-glow-text mt-3 font-display text-3xl text-cream-50 sm:text-4xl text-balance">
            Más que una fragancia.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-cream-200/75 sm:text-lg">
            En Gentleman Co nos especializamos en perfumería inspirada de alta calidad,
            seleccionada para quienes buscan aromas sofisticados, elegantes y memorables.
          </p>
          <p className="mt-4 font-body text-sm text-ink-300">Elaborado en Ibagué, Tolima.</p>
        </Reveal>
      </div>
    </section>
  )
}
