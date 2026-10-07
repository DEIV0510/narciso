import Reveal from './Reveal'
import { waLink, waMessages } from '../data/site'
import { HALLOWEEN_ACTIVE } from '../data/campaign'
import { Grain, Fog, Embers } from './HalloweenFx'
import { Moon, Bats, Branch, JackOLantern, Pumpkin } from './HalloweenArt'

// Cierre de la página. Fuera de campaña es la banda dorada de siempre; en la
// edición Halloween es la noche: luna de cosecha con murciélagos, ramas,
// calabazas encendidas en el suelo y niebla — mismo titular, texto y botón.
export default function FinalCTA() {
  if (!HALLOWEEN_ACTIVE) {
    return (
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#8a6526_0%,#d8b264_36%,#b4863a_62%,#7a5a22_100%)] py-16 sm:py-20">
        <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-900 sm:text-4xl text-balance">Tu próxima fragancia está aquí.</h2>
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

  return (
    <section className="relative overflow-hidden border-t border-gold-500/15 bg-night-950 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_110%,rgba(255,106,0,0.26),transparent_65%),radial-gradient(50%_60%_at_0%_0%,rgba(74,13,22,0.55),transparent_70%)]"
      />
      <Grain />
      <Moon
        rise
        parallax
        className="absolute -right-12 -top-8 aspect-square w-28 sm:right-[6%] sm:top-1/2 sm:w-56 sm:-translate-y-1/2 lg:right-[10%] lg:w-72"
      />
      <Bats
        rim
        className="absolute -right-12 -top-8 aspect-square w-28 sm:right-[6%] sm:top-1/2 sm:w-56 sm:-translate-y-1/2 lg:right-[10%] lg:w-72"
      />
      <Branch flip className="absolute -left-8 -top-3 h-36 w-auto text-black opacity-95 sm:h-52" />
      <JackOLantern className="absolute -bottom-2 left-[4%] w-20 sm:left-[8%] sm:w-28" />
      <Pumpkin className="absolute -bottom-3 left-[17%] hidden w-16 sm:block sm:left-[19%] sm:w-20" />
      <Embers density="light" />
      <Fog className="inset-x-0 bottom-0 h-40" />
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="hw-glow-text font-display text-3xl text-cream-50 sm:text-4xl text-balance">
            Tu próxima fragancia está aquí.
          </h2>
          <p className="mt-4 font-body text-base text-cream-200/85 sm:text-lg">
            Descubre tu aroma favorito y haz tu pedido directamente por WhatsApp.
          </p>
          <a
            href={waLink(waMessages.order)}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-btn-orange mt-8 inline-flex items-center justify-center rounded-full px-10 py-4 font-body text-sm font-medium uppercase tracking-wide hover:scale-[1.03]"
          >
            Comprar por WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
