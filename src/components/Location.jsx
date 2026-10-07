import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { Motes } from './HalloweenFx'
import { Candle, Cobweb } from './HalloweenArt'
import { brand, mapsUrl } from '../data/site'
import { IconMapPin, IconArrowRight } from './icons'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

export default function Location() {
  return (
    <section
      id="ubicacion"
      className={`relative scroll-mt-20 overflow-hidden bg-night-900 py-16 sm:scroll-mt-24 sm:py-24 ${
        HALLOWEEN_ACTIVE ? 'pt-24 sm:pt-28' : 'hw-top-line'
      }`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <SectionDivider icon="candle" />
          <Motes count={5} />
        </>
      )}
      <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
        <div className="relative">
          <Reveal className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-night-800 p-8 text-center shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95),0_0_60px_-34px_rgba(255,106,0,0.5)] sm:p-12">
            {HALLOWEEN_ACTIVE && (
              <>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,106,0,0.12),transparent_70%)]"
                />
                <Cobweb corner="tr" className="pointer-events-none absolute right-0 top-0 h-24 w-24 text-cream-200/25" />
              </>
            )}
            <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-300 ring-1 ring-gold-500/30">
              <IconMapPin />
            </span>
            <p className="section-eyebrow relative mt-5 text-gold-400">Ubicación</p>
            <h2 className="relative mt-2 font-display text-2xl text-cream-50 sm:text-3xl">Gentleman Co</h2>
            <p className="relative mt-4 font-body text-base leading-relaxed text-cream-200/75">
              {brand.address.line1}
              <br />
              {brand.address.line2}
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-btn-glow relative mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-gold-200 hover:border-gold-400 hover:bg-gold-500 hover:text-night-950"
            >
              Cómo llegar
              <IconArrowRight />
            </a>
          </Reveal>
          {HALLOWEEN_ACTIVE && (
            <>
              <Candle className="absolute -bottom-1 -left-3 hidden h-24 w-7 sm:block" />
              <Candle className="absolute -bottom-1 left-5 hidden h-16 w-6 sm:block" />
              <Candle className="absolute -bottom-1 -right-3 hidden h-20 w-7 sm:block" />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
