import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { Embers, Grain, Fog, HalloweenMark } from './HalloweenFx'
import { Branch, Moon, Bats, BatFlight, Rose, Candle } from './HalloweenArt'
import { IconArrowRight, IconRose, IconFlame, IconMoon } from './icons'
import { HALLOWEEN_ACTIVE, halloweenCopy, giftGuideCards } from '../data/campaign'

// Sección exclusiva de la campaña: NO agrega productos ni datos nuevos — las
// 3 tarjetas disparan el mismo evento `gentleman-co:filter-category` que ya
// usa GenderFinder.jsx para filtrar el catálogo real por género. Es la
// "sección de la luna": borgoña, luna llena con murciélagos, rosas oscuras y
// velas; la bandada cruza el fondo al llegar aquí.
function goToCategory(category) {
  window.dispatchEvent(new CustomEvent('gentleman-co:filter-category', { detail: category }))
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const CARD_ICON = { dama: IconRose, caballero: IconFlame, unisex: IconMoon }

export default function GiftGuide() {
  if (!HALLOWEEN_ACTIVE) return null

  return (
    <section className="relative overflow-hidden bg-night-950 pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div aria-hidden="true" className="hw-glow-burgundy pointer-events-none absolute inset-0" />
      <Grain fabric />
      <SectionDivider icon="pumpkin" />
      <Moon
        rise
        parallax
        className="absolute right-3 top-14 aspect-square w-20 sm:right-[6%] sm:top-16 sm:w-44 lg:right-[9%] lg:w-64"
      />
      <Bats
        rim
        bats={[
          { left: '-24%', top: '44%', w: '22%', delay: '-0.5s' },
          { left: '30%', top: '6%', w: '14%', delay: '-2s' },
          { left: '70%', top: '64%', w: '10%', delay: '-3.3s', sm: true },
        ]}
        className="absolute right-3 top-14 aspect-square w-20 sm:right-[6%] sm:top-16 sm:w-44 lg:right-[9%] lg:w-64"
      />
      <BatFlight count={5} className="h-3/4" />
      <Branch flip className="absolute -left-6 top-0 h-36 w-auto text-black opacity-90 sm:h-56" />
      <Rose className="absolute -bottom-3 left-[2%] hidden h-40 w-auto -rotate-[16deg] sm:block lg:h-48" />
      <Rose className="absolute -bottom-5 left-[8%] hidden h-28 w-auto rotate-[12deg] sm:block lg:h-36" />
      <Candle className="absolute bottom-6 right-[5%] hidden h-24 w-7 sm:block lg:h-28 lg:w-8" />
      <Candle className="absolute bottom-6 right-[9%] hidden h-16 w-6 sm:block lg:h-20" />
      <Embers density="light" />
      <Fog className="inset-x-0 bottom-0 h-40" />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <HalloweenMark className="justify-center text-2xl sm:text-[1.7rem]" />
          <h2 className="hw-glow-text mt-3 font-display text-3xl text-balance text-cream-50 sm:text-4xl">
            {halloweenCopy.giftGuideTitle}
          </h2>
          <p className="mt-3 font-body text-sm text-cream-200/80 sm:text-base">{halloweenCopy.giftGuideLine}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3">
          {giftGuideCards.map((card) => {
            const Icon = CARD_ICON[card.category]
            return (
              <button
                key={card.category}
                type="button"
                onClick={() => goToCategory(card.category)}
                className="hw-card group flex items-center justify-between gap-3 rounded-2xl border border-gold-400/25 bg-night-900/80 px-6 py-6 text-left shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] backdrop-blur-[2px] transition-colors duration-200 hover:bg-night-800"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-ember-400" />
                  <span className="font-display text-xl text-cream-50">{card.label}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/15 text-gold-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-ember-500 group-hover:text-night-950 group-hover:shadow-[0_0_22px_-4px_rgba(255,106,0,0.8)]">
                  <IconArrowRight className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
