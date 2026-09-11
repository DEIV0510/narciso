import Reveal from './Reveal'
import ValentineAccents from './ValentineAccents'
import { IconHeart, IconArrowRight } from './icons'
import { VALENTINES_ACTIVE, valentinesCopy, giftGuideCards } from '../data/campaign'

// Sección exclusiva de la campaña de San Valentín: NO agrega productos ni
// datos nuevos — las 3 tarjetas disparan el mismo evento
// `narciso:filter-category` que ya usa GenderFinder.jsx para filtrar el
// catálogo real por género. Fondo borgoña oscuro a propósito: es la "sección
// oscura/borgoña" del ritmo de fondos que pidió el cliente, entre las
// secciones claras del resto de la página.
function goToCategory(category) {
  window.dispatchEvent(new CustomEvent('narciso:filter-category', { detail: category }))
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function GiftGuide() {
  if (!VALENTINES_ACTIVE) return null

  return (
    <section className="relative overflow-hidden bg-wine-900 py-16 sm:py-20">
      <ValentineAccents />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-1.5 font-body text-[11px] uppercase tracking-widest2 text-wine-200">
            <IconHeart className="h-3 w-3" />
            {valentinesCopy.giftGuideEyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl text-balance text-cream-50 sm:text-4xl">
            {valentinesCopy.giftGuideTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-blush-100 sm:text-base">{valentinesCopy.giftGuideLine}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
          {giftGuideCards.map((card) => (
            <button
              key={card.category}
              type="button"
              onClick={() => goToCategory(card.category)}
              className="group flex items-center justify-between rounded-2xl border border-cream-50/15 bg-cream-50/5 px-6 py-6 text-left transition-colors duration-200 hover:border-gold-300/60 hover:bg-cream-50/10"
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
