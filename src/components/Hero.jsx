import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import { waLink, waMessages } from '../data/site'
import { IconArrowRight, IconMapPin, IconWhatsApp, IconPumpkin } from './icons'
import { Embers, Smoke, Grain, FlickerFlame } from './HalloweenFx'
import { Pumpkin, Branch } from './HalloweenArt'
import FeaturedLaunches from './FeaturedLaunches'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

const pills = ['Alta calidad', 'Perfumería inspirada', 'Atención personalizada']

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-20 bg-night-900 pt-4 sm:scroll-mt-24 sm:pt-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-500/25 bg-night-950 shadow-[0_32px_90px_-34px_rgba(0,0,0,0.95),0_0_70px_-32px_rgba(233,138,60,0.4)] sm:rounded-[2.5rem]">
          {HALLOWEEN_ACTIVE && (
            <>
              <div
                aria-hidden="true"
                className="hw-glow-warm hw-breathe pointer-events-none absolute inset-0"
              />
              <Grain />
              <Smoke parallax className="z-[5]" />
              <Embers className="z-[6]" />
            </>
          )}
          <div className="relative grid items-center gap-0 lg:grid-cols-2 lg:gap-8">
            <div className="relative z-10 order-1 px-6 pb-8 pt-9 sm:px-10 sm:pt-12 lg:order-1 lg:px-14 lg:py-20 xl:px-16">
              {HALLOWEEN_ACTIVE && (
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-ember-400/40 bg-ember-500/10 px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-ember-300 animate-fadeUp">
                  <IconPumpkin className="h-3.5 w-3.5 text-ember-400" />
                  {halloweenCopy.heroEyebrow}
                </span>
              )}
              <p className="section-eyebrow animate-fadeUp text-gold-400">Especialistas en inspiración</p>
              <h1 className="hw-glow-text mt-4 font-display text-[2.5rem] leading-[1.05] text-cream-50 sm:text-6xl lg:text-[3.4rem] xl:text-[3.8rem] animate-fadeUp [animation-delay:80ms]">
                GENTLEMAN
                <span className="hw-gold-text block">CO</span>
              </h1>
              <p className="mt-4 max-w-sm font-display italic text-lg text-cream-100/90 sm:text-xl animate-fadeUp [animation-delay:160ms]">
                Una fragancia que deja huella.
              </p>
              {HALLOWEEN_ACTIVE && (
                <p className="mt-2 flex items-center gap-2 font-display text-base text-gold-200 sm:text-lg animate-fadeUp [animation-delay:200ms]">
                  <FlickerFlame className="h-4 w-4 shrink-0 text-ember-400" />
                  {halloweenCopy.heroLine}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2 animate-fadeUp [animation-delay:220ms]">
                {pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-gold-400/25 bg-gold-500/5 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-100 sm:text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fadeUp [animation-delay:300ms]">
                <a
                  href="#catalogo"
                  className="hw-btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-night-950 hover:scale-[1.03] hover:bg-gold-400"
                >
                  Descubrir Perfumes
                  <IconArrowRight />
                </a>
                <a
                  href={waLink(waMessages.product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hw-btn-glow inline-flex items-center justify-center gap-2 rounded-full border border-gold-400/50 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 hover:border-gold-400 hover:bg-gold-500/10"
                >
                  Comprar por WhatsApp
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gold-500/15 pt-5 font-body text-xs text-ink-300 animate-fadeUp [animation-delay:340ms]">
                <span className="flex items-center gap-1.5">
                  <IconMapPin className="h-3.5 w-3.5 text-gold-400" />
                  Elaborado en Ibagué, Tolima
                </span>
                <span className="flex items-center gap-1.5">
                  <IconWhatsApp className="h-3.5 w-3.5 text-gold-400" />
                  Atención personalizada
                </span>
              </div>
            </div>

            <div className="relative order-2 lg:order-2 lg:h-full">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:aspect-auto lg:h-[min(36rem,78vh)] lg:max-w-none xl:h-[min(42rem,82vh)]">
                <picture>
                  <source srcSet={heroAvif} type="image/avif" />
                  <source srcSet={heroWebp} type="image/webp" />
                  <img
                    src={heroJpg}
                    alt="Frasco de Gentleman Co, perfume inspirado elaborado en Ibagué, Tolima"
                    className="h-full w-full object-cover lg:object-[center_30%]"
                    width={1600}
                    height={2143}
                    fetchpriority="high"
                    loading="eager"
                  />
                </picture>
                {HALLOWEEN_ACTIVE && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_46%,transparent_36%,rgba(7,6,5,0.74)_100%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(236,174,82,0.2)_0%,transparent_44%)]"
                    />
                    <Branch className="absolute -right-2 -top-2 h-28 w-auto text-night-950 opacity-90 sm:h-36 lg:h-44" />
                    <Pumpkin className="absolute bottom-1 -right-2 z-[7] w-[32%] max-w-[170px] sm:-right-2 lg:bottom-0 lg:right-3" />
                  </>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-950 to-transparent lg:hidden" />
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-night-950 to-transparent lg:block" />
                <FeaturedLaunches />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
