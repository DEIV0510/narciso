import Reveal from './Reveal'
import { waLink, waMessages } from '../data/site'
import { HALLOWEEN_ACTIVE } from '../data/campaign'
import { Grain } from './HalloweenFx'
import { Pumpkin, Branch } from './HalloweenArt'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#8a6526_0%,#d8b264_36%,#b4863a_62%,#7a5a22_100%)] py-16 sm:py-20">
      {HALLOWEEN_ACTIVE && (
        <>
          <Grain />
          <Branch flip className="absolute -left-8 -top-3 h-40 w-auto text-night-950 opacity-80 sm:h-52" />
          <Branch className="absolute -right-8 -bottom-5 h-40 w-auto rotate-180 text-night-950 opacity-80 sm:h-52" />
          <Pumpkin className="absolute -bottom-3 left-[5%] w-16 sm:left-[9%] sm:w-24" />
          <Pumpkin className="absolute -bottom-4 right-[7%] hidden w-20 sm:block sm:w-28" />
        </>
      )}
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
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
            className="hw-btn-glow mt-8 inline-flex items-center justify-center rounded-full bg-night-950 px-10 py-4 font-body text-sm uppercase tracking-wide text-gold-100 hover:scale-[1.03] focus-visible:outline-ink-900"
          >
            Comprar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
