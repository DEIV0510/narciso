import Reveal from './Reveal'
import { brand, mapsUrl } from '../data/site'
import { IconMapPin, IconArrowRight } from './icons'

export default function Location() {
  return (
    <section id="ubicacion" className="scroll-mt-20 bg-cream-50 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal className="rounded-3xl border border-ink-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-50 text-gold-600">
            <IconMapPin />
          </span>
          <p className="section-eyebrow mt-5 text-gold-600">Ubicación</p>
          <h2 className="mt-2 font-display text-2xl text-ink-900 sm:text-3xl">Narciso Parfum</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-500">
            {brand.address.line1}
            <br />
            {brand.address.line2}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 transition-colors hover:bg-gold-600"
          >
            Cómo llegar
            <IconArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
