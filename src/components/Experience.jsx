import heroAvif from '../assets/img/hero-bottle.avif'
import heroWebp from '../assets/img/hero-bottle.webp'
import heroJpg from '../assets/img/hero-bottle.jpg'
import Reveal from './Reveal'
import { IconArrowRight } from './icons'
import ValentineAccents from './ValentineAccents'
import { VALENTINES_ACTIVE, valentinesCopy } from '../data/campaign'

export default function Experience() {
  return (
    <section aria-labelledby="experience-heading" className="bg-cream-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.5rem]">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/8]">
            <picture>
              <source srcSet={heroAvif} type="image/avif" />
              <source srcSet={heroWebp} type="image/webp" />
              <img
                src={heroJpg}
                alt="Frasco de Narciso Parfum sobre un mostrador, con la estantería de fragancias de fondo"
                className="h-full w-full object-cover object-[center_28%] sm:object-[68%_38%]"
                loading="lazy"
                width={1600}
                height={2143}
              />
            </picture>
            <span
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent sm:bg-gradient-to-r sm:to-transparent ${
                VALENTINES_ACTIVE
                  ? 'from-wine-900/85 via-wine-900/25 sm:from-wine-900/85 sm:via-wine-900/30'
                  : 'from-ink-900/85 via-ink-900/20 sm:from-ink-900/85 sm:via-ink-900/30'
              }`}
            />
            <ValentineAccents />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:inset-y-0 sm:right-auto sm:flex sm:w-[55%] sm:flex-col sm:justify-center sm:p-12 lg:p-16">
              <p className="section-eyebrow text-gold-400">La experiencia</p>
              <h2 id="experience-heading" className="mt-3 font-display text-3xl text-cream-50 sm:text-4xl">
                Tu aroma. Tu presencia.
              </h2>
              <p className="mt-3 max-w-sm font-body text-sm text-ink-200 sm:text-base">
                Fragancias inspiradas para acompañar cada momento.
              </p>
              {VALENTINES_ACTIVE && (
                <p className="mt-1 max-w-sm font-display italic text-sm text-blush-100">{valentinesCopy.heroLine}</p>
              )}
              <a
                href="#catalogo"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-body text-xs uppercase tracking-wide text-ink-900 transition-transform duration-200 hover:scale-[1.03] sm:text-sm"
              >
                Descubrir Fragancias
                <IconArrowRight />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
