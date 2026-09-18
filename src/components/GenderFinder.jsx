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
import { IconArrowRight, IconHeart } from './icons'
import { VALENTINES_ACTIVE } from '../data/campaign'

const cards = [
  {
    label: 'Hombre',
    alt: 'Frasco de Gentleman Co en un escritorio de estudio masculino, fragancias para caballero',
    picture: { avif: genderCaballeroAvif, webp: genderCaballeroWebp, jpg: genderCaballeroJpg },
    category: 'caballero',
  },
  {
    label: 'Mujer',
    alt: 'Frasco de Gentleman Co junto a flores y joyería, fragancias para dama',
    picture: { avif: genderDamaAvif, webp: genderDamaWebp, jpg: genderDamaJpg },
    category: 'dama',
  },
  {
    label: 'Unisex',
    alt: 'Frasco de Gentleman Co en ambiente unisex, para él, para ella, para ti',
    picture: { avif: genderUnisexAvif, webp: genderUnisexWebp, jpg: genderUnisexJpg },
    category: 'unisex',
  },
]

function goToCategory(category) {
  window.dispatchEvent(new CustomEvent('gentleman-co:filter-category', { detail: category }))
  document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function GenderFinder() {
  return (
    <section aria-labelledby="genero-heading" className="bg-cream-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="text-center">
          <h2 id="genero-heading" className="font-display text-2xl text-ink-900 sm:text-3xl">
            Tu fragancia empieza aquí
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {cards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => goToCategory(card.category)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl text-left"
            >
              <CardImage card={card} />
            </button>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function CardImage({ card }) {
  return (
    <>
      <picture>
        <source srcSet={card.picture.avif} type="image/avif" />
        <source srcSet={card.picture.webp} type="image/webp" />
        <img
          src={card.picture.jpg}
          alt={card.alt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          width={800}
          height={1000}
        />
      </picture>
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent ${
          VALENTINES_ACTIVE ? 'from-wine-900/70 via-ink-900/10' : 'from-ink-900/70 via-ink-900/5'
        }`}
      />
      {VALENTINES_ACTIVE && (
        <span className="pointer-events-none absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/20 text-cream-50 backdrop-blur-sm">
          <IconHeart className="h-3.5 w-3.5" />
        </span>
      )}
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50 px-4 py-2 font-body text-xs uppercase tracking-wide text-ink-900 shadow-md transition-transform duration-200 group-hover:translate-x-0.5">
        {card.label}
        <IconArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  )
}
