import Reveal from './Reveal'
import { brand } from '../data/site'
import { IconInstagram, IconTikTok } from './icons'

export default function Socials() {
  return (
    <section aria-labelledby="socials-heading" className="bg-ink-900 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="section-eyebrow text-gold-400">Redes sociales</p>
          <h2 id="socials-heading" className="mt-3 font-display text-2xl text-cream-50 sm:text-3xl">
            Sigue a Narciso Parfum
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full border border-cream-50/25 px-6 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 transition-colors hover:bg-cream-50/10 sm:w-auto"
          >
            <IconInstagram className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={brand.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-xs items-center justify-center gap-2.5 rounded-full border border-cream-50/25 px-6 py-3.5 font-body text-sm uppercase tracking-wide text-cream-50 transition-colors hover:bg-cream-50/10 sm:w-auto"
          >
            <IconTikTok className="h-4 w-4" />
            TikTok
          </a>
        </Reveal>
      </div>
    </section>
  )
}
