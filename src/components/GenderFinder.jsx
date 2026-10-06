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
import { IconArrowRight, IconFlame } from './icons'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

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
    <section aria-labelledby="genero-heading" className="hw-top-line relative bg-night-900 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="text-center">
          <h2 id="genero-heading" className="font-display text-2xl text-cream-50 sm:text-3xl">
            Tu fragancia empieza aquí
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {cards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => goToCategory(card.category)}
              className="hw-card group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold-500/20 text-left shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]"
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
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/15 to-transparent" />
      {HALLOWEEN_ACTIVE && (
        <>
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(233,138,60,0.22),transparent_60%)]" />
          <span className="pointer-events-none absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/40 bg-night-950/55 text-ember-300 backdrop-blur-sm">
            <IconFlame className="h-3.5 w-3.5" />
          </span>
        </>
      )}
      <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-gold-400/50 bg-night-950/75 px-4 py-2 font-body text-xs uppercase tracking-wide text-cream-50 backdrop-blur-sm transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-night-950">
        {card.label}
        <IconArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  )
}
