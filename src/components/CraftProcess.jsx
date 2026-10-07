import { useState } from 'react'
import craftPosterAvif from '../assets/img/craft-poster.avif'
import craftPosterWebp from '../assets/img/craft-poster.webp'
import craftPosterJpg from '../assets/img/craft-poster.jpg'
import craftVideo from '../assets/video/craft-process.mp4'
import lifestylePosterAvif from '../assets/img/lifestyle-poster.avif'
import lifestylePosterWebp from '../assets/img/lifestyle-poster.webp'
import lifestylePosterJpg from '../assets/img/lifestyle-poster.jpg'
import lifestyleVideo from '../assets/video/lifestyle.mp4'
import studioPosterAvif from '../assets/img/studio-poster.avif'
import studioPosterWebp from '../assets/img/studio-poster.webp'
import studioPosterJpg from '../assets/img/studio-poster.jpg'
import studioVideo from '../assets/video/studio.mp4'
import Reveal from './Reveal'
import SectionDivider from './SectionDivider'
import { Embers } from './HalloweenFx'
import { Candle, Cobweb, BatFlight } from './HalloweenArt'
import { IconPlay } from './icons'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

const clips = [
  {
    key: 'proceso',
    label: 'El proceso',
    video: craftVideo,
    poster: { avif: craftPosterAvif, webp: craftPosterWebp, jpg: craftPosterJpg },
    alt: 'Elaborando una fragancia Gentleman Co: dosificación de esencias en el taller',
  },
  {
    key: 'fragancia',
    label: 'La fragancia',
    video: lifestyleVideo,
    poster: { avif: lifestylePosterAvif, webp: lifestylePosterWebp, jpg: lifestylePosterJpg },
    alt: 'Frasco de Gentleman Co en la mano, con la fragancia dorada a contraluz',
  },
  {
    key: 'taller',
    label: 'Nuestro taller',
    video: studioVideo,
    poster: { avif: studioPosterAvif, webp: studioPosterWebp, jpg: studioPosterJpg },
    alt: 'Frascos de Gentleman Co recién envasados en el taller',
  },
]

export default function CraftProcess() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = clips[active]

  function selectClip(i) {
    setActive(i)
    setPlaying(false)
  }

  return (
    <section
      id="proceso"
      className={`relative scroll-mt-20 overflow-hidden bg-night-900 py-16 sm:scroll-mt-24 sm:py-24 ${
        HALLOWEEN_ACTIVE ? 'pt-24 sm:pt-28' : 'hw-top-line'
      }`}
    >
      {HALLOWEEN_ACTIVE && (
        <>
          <SectionDivider icon="bat" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_50%_at_50%_62%,rgba(255,106,0,0.12),transparent_72%)]"
          />
          <BatFlight rtl count={4} className="h-1/2" />
          <Embers density="light" />
        </>
      )}
      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="section-eyebrow text-gold-400">Hecho a mano</p>
          <h2 className="mt-3 font-display text-3xl text-balance text-cream-50 sm:text-4xl">
            Así nace cada fragancia
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-cream-200/75 sm:text-lg">
            Cada frasco se dosifica, diluye y envasa a mano en Ibagué. Así se ve el
            proceso real, de principio a fin.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="relative mx-auto mt-10 max-w-sm px-6 sm:mt-12 sm:px-8">
        {HALLOWEEN_ACTIVE && (
          <>
            <Candle className="absolute -left-4 bottom-24 hidden h-28 w-8 sm:block" />
            <Candle className="absolute -left-12 bottom-24 hidden h-20 w-7 md:block" />
            <Candle className="absolute -right-4 bottom-24 hidden h-24 w-7 sm:block" />
            <Candle tone="black" className="absolute -right-11 bottom-24 hidden h-16 w-6 md:block" />
          </>
        )}
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-night-950 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95),0_0_60px_-26px_rgba(255,106,0,0.5)]">
          {HALLOWEEN_ACTIVE && !playing && (
            <Cobweb className="pointer-events-none absolute left-0 top-0 z-10 h-24 w-24 text-cream-200/30" />
          )}
          <div className="relative aspect-[4/5] w-full">
            {playing ? (
              <video
                key={current.key}
                src={current.video}
                controls
                autoPlay
                playsInline
                preload="none"
                className="h-full w-full object-cover"
              >
                Tu navegador no puede reproducir este video.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Reproducir video: ${current.label}`}
                className="group relative block h-full w-full"
              >
                <picture>
                  <source srcSet={current.poster.avif} type="image/avif" />
                  <source srcSet={current.poster.webp} type="image/webp" />
                  <img
                    src={current.poster.jpg}
                    alt={current.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </picture>
                <span className="absolute inset-0 bg-night-950/35 transition-colors group-hover:bg-night-950/50" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-night-950 transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20 ${
                      HALLOWEEN_ACTIVE ? 'hw-btn-orange' : 'bg-gold-500 shadow-[0_0_40px_rgba(233,138,60,0.45)]'
                    }`}
                  >
                    <IconPlay className="h-6 w-6 translate-x-0.5 sm:h-7 sm:w-7" />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 rounded-full border border-gold-500/30 bg-night-950/75 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-50">
                  {current.label}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3" role="tablist" aria-label="Videos de Gentleman Co">
          {clips.map((clip, i) => (
            <button
              key={clip.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => selectClip(i)}
              className={`group flex flex-col items-center gap-1.5 rounded-xl p-1 transition-colors ${
                active === i ? '' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <span
                className={`h-12 w-12 overflow-hidden rounded-full border-2 transition-colors ${
                  active === i
                    ? HALLOWEEN_ACTIVE
                      ? 'border-ember-500 shadow-[0_0_16px_-2px_rgba(255,106,0,0.7)]'
                      : 'border-gold-400'
                    : 'border-transparent'
                }`}
              >
                <img src={clip.poster.jpg} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="font-body text-[10px] uppercase tracking-wide text-ink-300 group-hover:text-cream-50">
                {clip.label}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
