import Reveal from './Reveal'
import { Embers, Grain } from './HalloweenFx'
import { Branch } from './HalloweenArt'
import { IconPumpkin, IconArrowRight } from './icons'
import { HALLOWEEN_ACTIVE, halloweenCopy, giftGuideCards } from '../data/campaign'

// Sección exclusiva de la campaña: NO agrega productos ni datos nuevos — las
// 3 tarjetas disparan el mismo evento `gentleman-co:filter-category` que ya
// usa GenderFinder.jsx para filtrar el catálogo real por género. Fondo negro
// con brasa y borgoña a propósito: es la "sección más oscura" del ritmo de
// fondos de la página.
function goToCategory(category) {
  window.dispatchEvent(new CustomEvent('gentleman-co:filter-category', { detail: category }))
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function GiftGuide() {
  if (!HALLOWEEN_ACTIVE) return null

  return (
    <section className="hw-top-line relative overflow-hidden bg-night-950 py-16 sm:py-20">
      <div aria-hidden="true" className="hw-glow-burgundy pointer-events-none absolute inset-0" />
      <Grain fabric />
      <Embers density="light" />
      <Branch flip className="absolute -left-6 top-0 h-36 w-auto text-night-700 opacity-80 sm:h-56" />
      <Branch className="absolute -right-6 bottom-0 hidden h-44 w-auto rotate-180 text-night-700 opacity-70 sm:block" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-widest2 text-ember-300">
            <IconPumpkin className="h-3.5 w-3.5" />
            {halloweenCopy.giftGuideEyebrow}
          </span>
          <h2 className="hw-glow-text mt-3 font-display text-3xl text-balance text-cream-50 sm:text-4xl">
            {halloweenCopy.giftGuideTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-cream-200/80 sm:text-base">{halloweenCopy.giftGuideLine}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
          {giftGuideCards.map((card) => (
            <button
              key={card.category}
              type="button"
              onClick={() => goToCategory(card.category)}
              className="hw-card group flex items-center justify-between rounded-2xl border border-gold-400/20 bg-night-800/70 px-6 py-6 text-left shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] transition-colors duration-200 hover:bg-night-700"
            >
              <span className="font-display text-xl text-cream-50">{card.label}</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300 transition-transform duration-200 group-hover:translate-x-0.5">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
