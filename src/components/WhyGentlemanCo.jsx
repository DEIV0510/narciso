import spotlightAvif from '../assets/img/spotlight-bottle.avif'
import spotlightWebp from '../assets/img/spotlight-bottle.webp'
import spotlightJpg from '../assets/img/spotlight-bottle.jpg'
import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { Motes } from './HalloweenFx'
import { Cobweb, Candle } from './HalloweenArt'
import { whyGentlemanCo, waLink, waMessages } from '../data/site'
import { IconCheck } from './icons'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

export default function WhyGentlemanCo() {
  return (
    <section
      aria-labelledby="why-heading"
      className={`relative overflow-hidden bg-night-900 py-16 sm:py-24 ${HALLOWEEN_ACTIVE ? 'pt-24 sm:pt-28' : 'hw-top-line'}`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <SectionDivider icon="candle" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_60%,rgba(255,106,0,0.1),transparent_70%)]"
          />
          <Motes count={5} />
        </>
      )}
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <Reveal className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-night-800 p-6 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95),0_0_50px_-30px_rgba(255,106,0,0.5)] sm:p-8">
            {HALLOWEEN_ACTIVE && (
              <Cobweb corner="tr" className="pointer-events-none absolute right-0 top-0 h-24 w-24 text-cream-200/25" />
            )}
            <div className="relative grid grid-cols-[1fr_auto] items-center gap-6">
              <ul className="space-y-3.5">
                {whyGentlemanCo.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-body text-sm text-cream-200/90 sm:text-base">
                    <IconCheck className="h-4 w-4 shrink-0 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="hidden w-28 shrink-0 overflow-hidden rounded-2xl border border-gold-500/25 sm:block">
                <picture>
                  <source srcSet={spotlightAvif} type="image/avif" />
                  <source srcSet={spotlightWebp} type="image/webp" />
                  <img
                    src={spotlightJpg}
                    alt="Frasco completo de Gentleman Co"
                    className="aspect-[3/4] h-full w-full object-cover"
                    loading="lazy"
                    width={300}
                    height={400}
                  />
                </picture>
              </div>
            </div>
          </Reveal>
          {HALLOWEEN_ACTIVE && (
            <>
              <Candle className="absolute -left-12 bottom-0 hidden h-24 w-7 xl:block" />
              <Candle className="absolute -left-[4.5rem] bottom-0 hidden h-16 w-6 xl:block" />
            </>
          )}
        </div>

        <Reveal delay={100} className="order-1 lg:order-2">
          <p className="section-eyebrow text-gold-400">¿Por qué Gentleman Co?</p>
          <h2 id="why-heading" className="hw-glow-text mt-3 font-display text-3xl text-balance text-cream-50 sm:text-4xl">
            Calidad que se siente real.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-cream-200/75 sm:text-lg">
            Todo lo que buscas en una fragancia inspirada: presentación cuidada, aroma que
            perdura y atención personalizada, sin complicaciones. Eso es Gentleman Co.
          </p>
          <a
            href={waLink(waMessages.catalog)}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-btn-glow mt-7 inline-flex items-center justify-center rounded-full border border-gold-400/60 px-8 py-3.5 font-body text-sm uppercase tracking-wide text-gold-200 hover:scale-[1.02] hover:border-gold-400 hover:bg-gold-500 hover:text-night-950"
          >
            Comprar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
