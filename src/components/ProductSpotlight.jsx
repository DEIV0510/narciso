import { useState } from 'react'
import spotlightAvif from '../assets/img/spotlight-bottle.avif'
import spotlightWebp from '../assets/img/spotlight-bottle.webp'
import spotlightJpg from '../assets/img/spotlight-bottle.jpg'
import Reveal from './Reveal'
import ProductModal from './ProductModal'
import SectionDivider from './SectionDivider'
import { Embers, Grain, Smoke, Fog } from './HalloweenFx'
import { Candle, Cobweb } from './HalloweenArt'
import { IconPumpkin } from './icons'
import { waLink, waMessages } from '../data/site'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

// Esquineras doradas del marco (detalle de mansión).
function GoldCorners() {
  const base = 'pointer-events-none absolute h-6 w-6 border-gold-400/60 sm:h-8 sm:w-8'
  return (
    <>
      <span aria-hidden="true" className={`${base} left-3 top-3 border-l border-t`} />
      <span aria-hidden="true" className={`${base} right-3 top-3 border-r border-t`} />
      <span aria-hidden="true" className={`${base} bottom-3 left-3 border-b border-l`} />
      <span aria-hidden="true" className={`${base} bottom-3 right-3 border-b border-r`} />
    </>
  )
}

// Edición Halloween: "el perfume en una mansión durante Halloween" — muro de
// piedra, luz de velas, humo, repisa de madera negra y marco con arco gótico
// y esquineras doradas. Textos, botones y el modal no cambian.
export default function ProductSpotlight() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="fragancia"
      className={`relative scroll-mt-20 overflow-hidden bg-night-950 py-16 sm:scroll-mt-24 sm:py-24 ${
        HALLOWEEN_ACTIVE ? 'pt-24 sm:pt-28' : 'hw-top-line'
      }`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <div aria-hidden="true" className="hw-stone pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_12%_82%,rgba(255,106,0,0.2),transparent_70%),radial-gradient(40%_45%_at_88%_82%,rgba(255,106,0,0.18),transparent_70%),radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgba(5,5,5,0.88)_100%)]"
          />
          <Grain />
          <SectionDivider icon="skull" />
          <Smoke />
          <Fog className="inset-x-0 bottom-0 h-48" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow text-gold-400">Nuestra fragancia</p>
          <h2 className="hw-glow-text mt-3 font-display text-3xl text-cream-50 sm:text-4xl text-balance">
            Gentleman Co
          </h2>
          <p className="mt-3 font-body text-sm text-cream-200/70 sm:text-base">
            Elaborada en Ibagué, Tolima. Pensada para dejar huella.
          </p>
        </Reveal>

        <div className="relative mt-10 sm:mt-14">
          <Reveal
            delay={120}
            className="group relative overflow-hidden rounded-3xl border border-gold-500/30 bg-night-950/85 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.95),0_0_70px_-30px_rgba(255,106,0,0.45)]"
          >
            {HALLOWEEN_ACTIVE && (
              <>
                <GoldCorners />
                <Cobweb corner="tr" className="pointer-events-none absolute right-0 top-0 h-28 w-28 text-cream-200/25" />
              </>
            )}
            <div className="grid sm:grid-cols-2">
              <div className={`relative ${HALLOWEEN_ACTIVE ? 'p-5 sm:p-7 lg:p-9' : ''}`}>
                <div
                  className={`relative overflow-hidden ${
                    HALLOWEEN_ACTIVE
                      ? 'hw-arch aspect-[4/5] rounded-b-2xl border border-gold-400/45 shadow-[inset_0_0_0_5px_rgba(8,8,8,0.55),0_20px_40px_-20px_rgba(0,0,0,0.9)] lg:aspect-square'
                      : 'aspect-square sm:aspect-auto sm:h-full'
                  }`}
                >
                  <picture>
                    <source srcSet={spotlightAvif} type="image/avif" />
                    <source srcSet={spotlightWebp} type="image/webp" />
                    <img
                      src={spotlightJpg}
                      alt="Gentleman Co, frasco negro con tapa dorada y etiqueta con corona"
                      className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                        HALLOWEEN_ACTIVE ? 'object-[center_42%] [filter:brightness(0.84)_contrast(1.08)_saturate(0.95)]' : ''
                      }`}
                      loading="lazy"
                      width={800}
                      height={1483}
                    />
                  </picture>
                  {HALLOWEEN_ACTIVE && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_55%_45%,transparent_40%,rgba(8,8,8,0.62)_100%),linear-gradient(110deg,rgba(255,106,0,0.16),transparent_45%)]"
                    />
                  )}
                </div>
              </div>

              <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex w-fit items-center rounded-full bg-gold-500/10 px-3 py-1 font-body text-[11px] uppercase tracking-widest2 text-gold-400">
                    Especialistas en inspiración
                  </span>
                  {HALLOWEEN_ACTIVE && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-3 py-1 font-gothic text-sm tracking-wide text-ember-400">
                      <IconPumpkin className="h-3.5 w-3.5" />
                      {halloweenCopy.heroEyebrow}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl text-cream-50 sm:text-3xl">Eau de parfum / vaporisateur</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-cream-200/70 sm:text-base">
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
              {/* Repisa de madera negra con velas a los lados (solo escritorio:
                  en móvil taparían los botones). */}
              <div aria-hidden="true" className="hw-wood absolute -bottom-3 -inset-x-2 hidden h-4 rounded-sm shadow-[0_18px_30px_-10px_rgba(0,0,0,0.95)] lg:block" />
              <Candle className="absolute bottom-1 left-4 hidden h-28 w-8 lg:block" />
              <Candle className="absolute bottom-1 left-12 hidden h-20 w-7 lg:block" />
              <Candle className="absolute bottom-1 right-5 hidden h-32 w-8 lg:block" />
              <Candle className="absolute bottom-1 right-[3.4rem] hidden h-24 w-7 lg:block" />
              <Candle tone="black" className="absolute bottom-1 right-[6rem] hidden h-16 w-6 lg:block" />
            </>
          )}
        </div>
      </div>

      <ProductModal open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
