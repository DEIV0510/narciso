import Reveal from './Reveal'
import { brand, mapsUrl } from '../data/site'
import { IconMapPin, IconArrowRight } from './icons'

export default function Location() {
  return (
    <section id="ubicacion" className="hw-top-line relative scroll-mt-20 bg-night-900 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal className="rounded-3xl border border-gold-500/20 bg-night-800 p-8 text-center shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95)] sm:p-12">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-300 ring-1 ring-gold-500/25">
            <IconMapPin />
          </span>
          <p className="section-eyebrow mt-5 text-gold-400">Ubicación</p>
          <h2 className="mt-2 font-display text-2xl text-cream-50 sm:text-3xl">Gentleman Co</h2>
          <p className="mt-4 font-body text-base leading-relaxed text-cream-200/75">
            {brand.address.line1}
            <br />
            {brand.address.line2}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-btn-glow mt-7 inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-7 py-3.5 font-body text-sm uppercase tracking-wide text-gold-200 hover:border-gold-400 hover:bg-gold-500 hover:text-night-950"
          >
            Cómo llegar
            <IconArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
