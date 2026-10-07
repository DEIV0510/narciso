import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import bottleAvif from '../assets/img/catalog-bottle.avif'
import bottleWebp from '../assets/img/catalog-bottle.webp'
import bottleJpg from '../assets/img/catalog-bottle.jpg'
import { waLink, waMessages } from '../data/site'
import { IconArrowRight, IconMapPin, IconWhatsApp } from './icons'
import { Embers, Grain, Fog, FlickerFlame, HalloweenMark } from './HalloweenFx'
import { Moon, Bats, BatFlight, Branch, Candle, JackOLantern, Cobweb, Spider, Glint } from './HalloweenArt'
import FeaturedLaunches from './FeaturedLaunches'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

const pills = ['Alta calidad', 'Perfumería inspirada', 'Atención personalizada']

// Murciélagos delante de la luna (posiciones relativas al disco).
const MOON_BATS = [
  { left: '-4%', top: '40%', w: '15%', delay: '0s' },
  { left: '20%', top: '12%', w: '9%', delay: '-1.4s' },
  { left: '62%', top: '58%', w: '7%', delay: '-2.9s', sm: true },
]

// Escena de la edición Halloween: el frasco real (foto recortada del
// catálogo, la misma de las tarjetas) iluminado sobre una mesa negra, con
// luna de cosecha, rama, murciélagos, velas, calabazas, niebla y brasas.
// Izquierda: tarjetas de lanzamientos + calabaza tallada; centro: frasco;
// derecha: luna + velas — así nada tapa el producto ni las tarjetas.
function NightScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Moon
        rise
        riseDelay={1.1}
        parallax="root"
        className="absolute right-[4%] top-[3%] aspect-square w-[60%] lg:right-[7%] lg:top-[5%] lg:w-[56%]"
      />
      <Bats
        rim
        bats={MOON_BATS}
        className="absolute right-[4%] top-[3%] aspect-square w-[60%] lg:right-[7%] lg:top-[5%] lg:w-[56%]"
      />
      <Branch className="absolute -right-3 -top-3 h-[38%] w-auto text-black lg:h-[44%]" />

      {/* Luz de velas y calabaza sobre la mesa (pulsa muy suave). */}
      <span className="hw-breathe absolute bottom-[4%] right-[2%] h-[46%] w-[48%] rounded-full bg-[radial-gradient(closest-side,rgba(255,138,46,0.3),transparent)]" />
      <span className="hw-breathe absolute bottom-[2%] left-[0%] h-[40%] w-[44%] rounded-full bg-[radial-gradient(closest-side,rgba(255,106,0,0.24),transparent)] [animation-delay:-3s]" />

      <Fog
        className="inset-x-0 bottom-[10%] h-[36%] [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_85%,transparent)]"
        front={false}
      />

      {/* Mesa negra brillante con un filo de reflejo dorado (se funde a los lados). */}
      <span className="absolute inset-x-0 bottom-0 h-[13%] bg-[linear-gradient(180deg,rgba(8,8,8,0)_0%,rgba(5,5,5,0.85)_45%,#040404_100%)] [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_78%,transparent)]" />
      <span className="absolute inset-x-[10%] bottom-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

      {/* Frasco protagonista: luz de vela por la izquierda y de luna por la derecha. */}
      <div className="absolute bottom-[11%] left-1/2 h-[62%] -translate-x-1/2 lg:h-[66%]">
        <span className="absolute -bottom-[3%] left-1/2 h-[7%] w-[150%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.9),transparent)]" />
        <picture>
          <source srcSet={bottleAvif} type="image/avif" />
          <source srcSet={bottleWebp} type="image/webp" />
          <img
            src={bottleJpg}
            alt="Frasco de Gentleman Co, perfume inspirado elaborado en Ibagué, Tolima"
            className="relative h-full w-auto max-w-none [filter:drop-shadow(-10px_4px_18px_rgba(255,106,0,0.38))_drop-shadow(9px_-6px_22px_rgba(237,229,213,0.14))]"
            width={552}
            height={1507}
            fetchpriority="high"
            loading="eager"
          />
        </picture>
        {/* Reflejo sobre la mesa. */}
        <picture aria-hidden="true">
          <source srcSet={bottleAvif} type="image/avif" />
          <source srcSet={bottleWebp} type="image/webp" />
          <img
            src={bottleJpg}
            alt=""
            className="absolute left-0 top-full h-[22%] w-full -scale-y-100 object-cover object-bottom opacity-[0.18] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.65),transparent_75%)]"
            width={552}
            height={1507}
            loading="eager"
          />
        </picture>
        <Glint className="absolute left-[60%] top-[3%] w-[30%]" />
      </div>

      <Candle className="absolute bottom-[11%] right-[13%] h-[22%] w-[6.2%] lg:h-[26%] lg:w-[6%]" />
      <Candle className="absolute bottom-[11%] right-[21%] h-[15%] w-[5.4%] lg:h-[19%] lg:w-[5.2%]" />
      <Candle tone="black" className="absolute bottom-[11%] right-[6%] h-[12%] w-[5%] lg:h-[14%] lg:w-[4.8%]" />

      <JackOLantern className="absolute bottom-[4%] left-[3%] w-[28%] lg:left-[4%] lg:w-[25%]" />

      <Fog
        className="inset-x-0 bottom-0 h-[22%] [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_85%,transparent)]"
        front={false}
      />
      <Embers className="z-[6]" />
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-20 bg-night-950 pt-3 sm:scroll-mt-24 sm:pt-5">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-500/25 bg-night-950 shadow-[0_32px_90px_-34px_rgba(0,0,0,0.95),0_0_80px_-30px_rgba(255,106,0,0.45)] sm:rounded-[2.5rem]">
          {HALLOWEEN_ACTIVE && (
            <>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_78%_105%,rgba(255,106,0,0.22),transparent_62%),radial-gradient(60%_60%_at_6%_0%,rgba(74,13,22,0.6),transparent_70%),linear-gradient(180deg,#0b0a0a_0%,#080808_52%,#130a05_100%)]"
              />
              <Grain />
              <Cobweb className="absolute left-0 top-0 h-28 w-28 text-cream-200/25 sm:h-36 sm:w-36" />
              <Spider className="absolute left-[30%] top-0 hidden lg:block" drop={58} size={24} />
              <BatFlight delay={1.5} count={4} className="z-[8] h-[55%]" />
            </>
          )}
          <div className="relative grid items-center gap-0 lg:grid-cols-2 lg:items-stretch lg:gap-8">
            <div className="relative z-10 order-1 px-6 pb-6 pt-9 sm:px-10 sm:pt-12 lg:order-1 lg:self-center lg:px-14 lg:py-20 xl:px-16">
              {HALLOWEEN_ACTIVE && (
                <HalloweenMark className="mb-4 text-[1.7rem] animate-fadeUp sm:text-3xl lg:text-[2.15rem]" />
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
                    className="rounded-full border border-gold-400/25 bg-night-900/70 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-100 sm:text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap animate-fadeUp [animation-delay:300ms]">
                <a
                  href="#catalogo"
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 font-body text-sm uppercase tracking-wide hover:scale-[1.03] lg:px-6 lg:text-[13px] ${
                    HALLOWEEN_ACTIVE
                      ? 'hw-btn-orange font-medium'
                      : 'hw-btn-glow bg-gold-500 text-night-950 hover:bg-gold-400'
                  }`}
                >
                  Descubrir Perfumes
                  <IconArrowRight />
                </a>
                <a
                  href={waLink(waMessages.product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hw-btn-glow inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gold-400/50 bg-night-950/40 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 hover:border-gold-300 hover:bg-gold-500/10 lg:px-6 lg:text-[13px]"
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
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md sm:max-w-lg lg:aspect-auto lg:h-full lg:min-h-[min(40rem,82vh)] lg:max-w-none xl:min-h-[min(42rem,84vh)]">
                {HALLOWEEN_ACTIVE ? (
                  <NightScene />
                ) : (
                  <>
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
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-950 to-transparent lg:hidden" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-night-950 to-transparent lg:block" />
                  </>
                )}
                <FeaturedLaunches />
              </div>
            </div>
          </div>
          {HALLOWEEN_ACTIVE && <span aria-hidden="true" className="hw-sweep" />}
        </div>
      </div>
    </section>
  )
}
