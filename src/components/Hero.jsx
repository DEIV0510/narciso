import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import { waLink, waMessages } from '../data/site'
import { IconArrowRight, IconMapPin, IconWhatsApp } from './icons'

const pills = ['Alta calidad', 'Perfumería inspirada', 'Atención personalizada']

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-20 bg-cream-50 pt-4 sm:scroll-mt-24 sm:pt-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-ink-900 sm:rounded-[2.5rem]">
          <div className="grid items-center gap-0 lg:grid-cols-2 lg:gap-8">
            <div className="relative order-1 px-6 pb-8 pt-9 sm:px-10 sm:pt-12 lg:order-1 lg:px-14 lg:py-20 xl:px-16">
              <p className="section-eyebrow animate-fadeUp text-gold-400">Especialistas en inspiración</p>
              <h1 className="mt-4 font-display text-[2.5rem] leading-[1.05] text-cream-50 sm:text-6xl lg:text-[3.4rem] xl:text-[3.8rem] animate-fadeUp [animation-delay:80ms]">
                NARCISO
                <span className="block text-gold-400">PARFUM</span>
              </h1>
              <p className="mt-4 max-w-sm font-display italic text-lg text-cream-100/90 sm:text-xl animate-fadeUp [animation-delay:160ms]">
                Una fragancia que deja huella.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 animate-fadeUp [animation-delay:220ms]">
                {pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-cream-50/15 bg-cream-50/5 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-100 sm:text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fadeUp [animation-delay:300ms]">
                <a
                  href="#catalogo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.03] hover:bg-gold-400"
                >
                  Descubrir Perfumes
                  <IconArrowRight />
                </a>
                <a
                  href={waLink(waMessages.product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream-50/30 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 transition-colors duration-200 hover:bg-cream-50/10"
                >
                  Comprar por WhatsApp
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cream-50/10 pt-5 font-body text-xs text-ink-300 animate-fadeUp [animation-delay:340ms]">
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
                    alt="Frasco de Narciso Parfum, perfume inspirado elaborado en Ibagué, Tolima"
                    className="h-full w-full object-cover lg:object-[center_30%]"
                    width={1600}
                    height={2143}
                    fetchpriority="high"
                    loading="eager"
                  />
                </picture>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent lg:hidden" />
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-ink-900 to-transparent lg:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
