import { useState } from 'react'
import spotlightAvif from '../assets/img/spotlight-bottle.avif'
import spotlightWebp from '../assets/img/spotlight-bottle.webp'
import spotlightJpg from '../assets/img/spotlight-bottle.jpg'
import Reveal from './Reveal'
import ProductModal from './ProductModal'
import { Embers, Grain } from './HalloweenFx'
import { Candle } from './HalloweenArt'
import { IconPumpkin } from './icons'
import { waLink, waMessages } from '../data/site'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

export default function ProductSpotlight() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="fragancia"
      className="hw-top-line relative scroll-mt-20 overflow-hidden bg-night-950 py-16 sm:py-24 sm:scroll-mt-24"
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <div aria-hidden="true" className="hw-glow-warm pointer-events-none absolute inset-0 opacity-70" />
          <Grain />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow text-gold-400">Nuestra fragancia</p>
          <h2 className="hw-glow-text mt-3 font-display text-3xl text-cream-50 sm:text-4xl text-balance">
            Gentleman Co
          </h2>
          <p className="mt-3 font-body text-sm text-ink-300 sm:text-base">
            Elaborada en Ibagué, Tolima. Pensada para dejar huella.
          </p>
        </Reveal>

        <div className="relative mt-10 sm:mt-14">
          <Reveal
            delay={120}
            className="group relative overflow-hidden rounded-3xl border border-gold-500/25 bg-night-800 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.95),0_0_60px_-30px_rgba(233,138,60,0.35)]"
          >
            <div className="grid sm:grid-cols-2">
              <div className="relative aspect-square overflow-hidden sm:aspect-auto">
                <picture>
                  <source srcSet={spotlightAvif} type="image/avif" />
                  <source srcSet={spotlightWebp} type="image/webp" />
                  <img
                    src={spotlightJpg}
                    alt="Gentleman Co, frasco negro con tapa dorada y etiqueta con corona"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    width={800}
                    height={1483}
                  />
                </picture>
                {HALLOWEEN_ACTIVE && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_40%,rgba(7,6,5,0.6)_100%)]"
                  />
                )}
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-gold-500/10 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-gold-400">
                    Especialistas en inspiración
                  </span>
                  {HALLOWEEN_ACTIVE && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ember-400/35 bg-ember-500/10 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-ember-300">
                      <IconPumpkin className="h-3.5 w-3.5" />
                      {halloweenCopy.heroEyebrow}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl text-cream-50 sm:text-3xl">
                  Eau de parfum / vaporisateur
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-300 sm:text-base">
                  Spray presurizado de alta calidad. Una fragancia inspirada, sofisticada y
                  elegante, elaborada en Ibagué, Tolima.
                </p>

                <div className="mt-5 inline-flex w-fit items-center rounded-full border border-gold-500/40 px-4 py-2 font-body text-xs uppercase tracking-wide text-gold-300">
                  Consulta disponibilidad y precio
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="hw-btn-glow inline-flex items-center justify-center rounded-full border border-gold-400/50 px-6 py-3 font-body text-sm uppercase tracking-wide text-cream-50 hover:border-gold-400 hover:bg-gold-500/10"
                  >
                    Ver perfume
                  </button>
                  <a
                    href={waLink(waMessages.product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform hover:scale-[1.02]"
                  >
                    Comprar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
          {HALLOWEEN_ACTIVE && (
            <>
              <Embers density="light" className="rounded-3xl" />
              <Candle className="absolute bottom-7 right-8 hidden h-28 w-9 lg:block" />
              <Candle className="absolute bottom-7 right-[4.6rem] hidden h-20 w-7 lg:block" />
            </>
          )}
        </div>
      </div>

      <ProductModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
