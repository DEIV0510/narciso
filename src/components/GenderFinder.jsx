import genderCaballeroAvif from '../assets/img/gender-caballero.avif'
import genderCaballeroWebp from '../assets/img/gender-caballero.webp'
import genderCaballeroJpg from '../assets/img/gender-caballero.jpg'
import genderDamaAvif from '../assets/img/gender-dama.avif'
import genderDamaWebp from '../assets/img/gender-dama.webp'
import genderDamaJpg from '../assets/img/gender-dama.jpg'
import genderUnisexAvif from '../assets/img/gender-unisex.avif'
import genderUnisexWebp from '../assets/img/gender-unisex.webp'
import genderUnisexJpg from '../assets/img/gender-unisex.jpg'
import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { IconArrowRight, IconFlame, IconRose, IconMoon } from './icons'
import { Embers, Smoke, Fog } from './HalloweenFx'
import { Moon, Bats, Rose, Candle, BatFlight } from './HalloweenArt'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

// Cada categoría real tiene su propia noche (edición Halloween):
// Hombre = negro, humo, fuego y sombras · Mujer = borgoña, rosas oscuras y
// velas · Unisex = negro, naranja y luna. Las fotos reales no se cambian: solo
// se oscurecen y se les pone la ambientación encima.
const cards = [
  {
    label: 'Hombre',
    alt: 'Frasco de Gentleman Co en un escritorio de estudio masculino, fragancias para caballero',
    picture: { avif: genderCaballeroAvif, webp: genderCaballeroWebp, jpg: genderCaballeroJpg },
    category: 'caballero',
    theme: 'fire',
  },
  {
    label: 'Mujer',
    alt: 'Frasco de Gentleman Co junto a flores y joyería, fragancias para dama',
    picture: { avif: genderDamaAvif, webp: genderDamaWebp, jpg: genderDamaJpg },
    category: 'dama',
    theme: 'rose',
  },
  {
    label: 'Unisex',
    alt: 'Frasco de Gentleman Co en ambiente unisex, para él, para ella, para ti',
    picture: { avif: genderUnisexAvif, webp: genderUnisexWebp, jpg: genderUnisexJpg },
    category: 'unisex',
    theme: 'moon',
  },
]

const THEME_ICON = { fire: IconFlame, rose: IconRose, moon: IconMoon }
const THEME_FILTER = {
  fire: '[filter:brightness(0.72)_saturate(0.9)_contrast(1.06)]',
  rose: '[filter:brightness(0.7)_saturate(0.75)_sepia(0.12)_contrast(1.05)]',
  moon: '[filter:brightness(0.58)_saturate(0.7)_contrast(1.08)]',
}

function goToCategory(category) {
  window.dispatchEvent(new CustomEvent('gentleman-co:filter-category', { detail: category }))
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function GenderFinder() {
  return (
    <section
      aria-labelledby="genero-heading"
      className={`relative overflow-hidden bg-night-950 py-14 sm:py-20 ${HALLOWEEN_ACTIVE ? 'pt-20 sm:pt-24' : 'hw-top-line'}`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <SectionDivider icon="moon" />
          <BatFlight count={4} className="h-1/2" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(255,106,0,0.1),transparent_70%)]"
          />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="text-center">
          <h2 id="genero-heading" className="hw-glow-text font-display text-2xl text-cream-50 sm:text-3xl">
            Tu fragancia empieza aquí
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {cards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => goToCategory(card.category)}
              className={`hw-card group relative block aspect-[4/5] w-full overflow-hidden border border-gold-500/25 text-left shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)] ${
                HALLOWEEN_ACTIVE ? 'hw-arch rounded-b-3xl' : 'rounded-3xl'
              }`}
            >
              <CardImage card={card} />
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ThemeLayers({ theme }) {
  if (theme === 'fire') {
    return (
      <>
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_48%_at_50%_104%,rgba(255,106,0,0.5),rgba(200,90,0,0.16)_50%,transparent_75%)]" />
        <Smoke />
        <Embers density="light" />
      </>
    )
  }
  if (theme === 'rose') {
    return (
      <>
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(74,13,22,0.42),rgba(51,8,15,0.62))]" />
        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_32%_at_84%_70%,rgba(255,138,46,0.32),transparent_70%)]" />
        <Candle className="absolute bottom-[19%] right-[11%] h-[22%] w-[7%]" />
        <Candle className="absolute bottom-[19%] right-[19%] h-[15%] w-[6%]" />
        <Rose className="absolute -bottom-[3%] -left-[4%] h-[46%] w-auto -rotate-[18deg]" />
        <Rose className="absolute -bottom-[6%] left-[14%] h-[34%] w-auto rotate-[14deg] opacity-90" />
      </>
    )
  }
  return (
    <>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_45%_at_50%_104%,rgba(255,106,0,0.42),transparent_72%)]" />
      <Moon soft className="absolute right-[8%] top-[9%] aspect-square w-[36%]" />
      <Bats
        rim
        bats={[
          { left: '-30%', top: '50%', w: '26%', delay: '-0.8s' },
          { left: '40%', top: '-8%', w: '18%', delay: '-2.4s' },
        ]}
        className="absolute right-[8%] top-[9%] aspect-square w-[36%]"
      />
    </>
  )
}

function CardImage({ card }) {
  const Icon = THEME_ICON[card.theme]
  return (
    <>
      <picture>
        <source srcSet={card.picture.avif} type="image/avif" />
        <source srcSet={card.picture.webp} type="image/webp" />
        <img
          src={card.picture.jpg}
          alt={card.alt}
          className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            HALLOWEEN_ACTIVE ? THEME_FILTER[card.theme] : ''
          }`}
          loading="lazy"
          width={800}
          height={1000}
        />
      </picture>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/15 to-night-950/25" />
      {HALLOWEEN_ACTIVE && (
        <>
          <ThemeLayers theme={card.theme} />
          <Fog className="inset-x-0 bottom-0 h-1/3" front={false} />
          <span className="pointer-events-none absolute left-1/2 top-5 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gold-400/45 bg-night-950/70 text-ember-300 shadow-[0_0_18px_-4px_rgba(255,106,0,0.7)] backdrop-blur-sm">
            <Icon className="h-4 w-4" />
          </span>
        </>
      )}
      <span
        className={`absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-night-950/75 px-4 py-2 font-body text-xs uppercase tracking-wide text-cream-50 backdrop-blur-sm transition-all duration-200 group-hover:translate-x-0.5 ${
          HALLOWEEN_ACTIVE
            ? 'group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-night-950 group-hover:shadow-[0_0_24px_-4px_rgba(255,106,0,0.8)]'
            : 'group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-night-950'
        }`}
      >
        {card.label}
        <IconArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  )
}
