import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import Reveal from './Reveal'
import { IconArrowRight } from './icons'
import { Embers, Fog } from './HalloweenFx'
import { Cobweb, BatFlight } from './HalloweenArt'
import { HALLOWEEN_ACTIVE, halloweenCopy } from '../data/campaign'

export default function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="relative bg-night-950 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-gold-500/25 shadow-[0_30px_70px_-34px_rgba(0,0,0,0.95),0_0_70px_-34px_rgba(255,106,0,0.45)] sm:rounded-[2.5rem]">
            <div className="relative aspect-[4/5] w-full sm:aspect-[16/8]">
              <picture>
                <source srcSet={heroAvif} type="image/avif" />
                <source srcSet={heroWebp} type="image/webp" />
                <img
                  src={heroJpg}
                  alt="Frasco de Gentleman Co sobre un mostrador, con la estantería de fragancias de fondo"
                  className={`h-full w-full object-cover object-[center_28%] sm:object-[68%_38%] ${
                    HALLOWEEN_ACTIVE ? '[filter:brightness(0.78)_contrast(1.08)_saturate(0.9)]' : ''
                  }`}
                  loading="lazy"
                  width={1600}
                  height={2143}
                />
              </picture>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/35 to-transparent sm:bg-gradient-to-r sm:from-night-950/90 sm:via-night-950/40 sm:to-transparent" />
              {HALLOWEEN_ACTIVE && (
                <>
                  <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_55%,rgba(255,106,0,0.22),transparent_55%),radial-gradient(120%_90%_at_60%_50%,transparent_50%,rgba(8,8,8,0.6)_100%)]" />
                  <Cobweb corner="tr" className="absolute right-0 top-0 h-28 w-28 text-cream-200/30 sm:h-40 sm:w-40" />
                  <Fog className="inset-x-0 bottom-0 h-1/3" />
                  <BatFlight count={4} className="h-2/3" />
                </>
              )}

              <div className="absolute inset-x-0 bottom-0 p-6 sm:inset-y-0 sm:right-auto sm:flex sm:w-[55%] sm:flex-col sm:justify-center sm:p-12 lg:p-16">
                <p className="section-eyebrow text-gold-400">La experiencia</p>
                <h2 id="experience-heading" className="hw-glow-text mt-3 font-display text-3xl text-cream-50 sm:text-4xl">
                  Tu aroma. Tu presencia.
                </h2>
                <p className="mt-3 max-w-sm font-body text-sm text-cream-200/85 sm:text-base">
                  Fragancias inspiradas para acompañar cada momento.
                </p>
                {HALLOWEEN_ACTIVE && (
                  <p className="mt-1 max-w-sm font-display text-sm italic text-ember-300">{halloweenCopy.heroLine}</p>
                )}
                <a
                  href="#catalogo"
                  className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 font-body text-xs uppercase tracking-wide hover:scale-[1.03] sm:text-sm ${
                    HALLOWEEN_ACTIVE ? 'hw-btn-orange font-medium' : 'hw-btn-glow bg-gold-500 text-night-950 hover:bg-gold-400'
                  }`}
                >
                  Descubrir Fragancias
                  <IconArrowRight />
                </a>
              </div>
            </div>
          </Reveal>
          {HALLOWEEN_ACTIVE && <Embers density="light" className="rounded-[1.75rem] sm:rounded-[2.5rem]" />}
        </div>
      </div>
    </section>
  )
}
