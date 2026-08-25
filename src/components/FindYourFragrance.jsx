import Reveal from './Reveal'
import { waLink, waMessages } from '../data/site'
import { IconArrowRight } from './icons'

const options = [
  { label: 'Femenina', message: waMessages.feminine },
  { label: 'Masculina', message: waMessages.masculine },
  { label: 'Unisex', message: waMessages.unisex },
]

export default function FindYourFragrance() {
  return (
    <section id="encuentra" className="scroll-mt-20 bg-cream-50 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="section-eyebrow text-gold-600">Encuentra tu fragancia</p>
          <h2 className="mt-3 font-display text-3xl text-ink-900 sm:text-4xl text-balance">
            ¿Buscas una fragancia para ti?
          </h2>
          <p className="mt-3 font-body text-sm text-ink-400 sm:text-base">
            Elige una opción y te recomendamos por WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {options.map((opt) => (
            <a
              key={opt.label}
              href={waLink(opt.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-ink-100 bg-white px-6 py-5 font-display text-lg text-ink-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-md sm:flex-col sm:items-center sm:gap-3 sm:py-8 sm:text-center"
            >
              <span>{opt.label}</span>
              <span className="flex items-center gap-1 font-body text-xs uppercase tracking-wide text-gold-600">
                Consultar
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
