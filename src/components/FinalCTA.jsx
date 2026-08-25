import Reveal from './Reveal'
import { waLink, waMessages } from '../data/site'

export default function FinalCTA() {
  return (
    <section className="bg-gold-500 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-900 sm:text-4xl text-balance">
            Tu próxima fragancia está aquí.
          </h2>
          <p className="mt-4 font-body text-base text-ink-900 sm:text-lg">
            Descubre tu aroma favorito y haz tu pedido directamente por WhatsApp.
          </p>
          <a
            href={waLink(waMessages.order)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-ink-900 px-10 py-4 font-body text-sm uppercase tracking-wide text-cream-50 transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-ink-900"
          >
            Comprar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
