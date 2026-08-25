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
import { IconPlay } from './icons'

const clips = [
  {
    key: 'proceso',
    label: 'El proceso',
    video: craftVideo,
    poster: { avif: craftPosterAvif, webp: craftPosterWebp, jpg: craftPosterJpg },
    alt: 'Elaborando una fragancia Narciso Parfum: dosificación de esencias en el taller',
  },
  {
    key: 'fragancia',
    label: 'La fragancia',
    video: lifestyleVideo,
    poster: { avif: lifestylePosterAvif, webp: lifestylePosterWebp, jpg: lifestylePosterJpg },
    alt: 'Frasco de Narciso Parfum en la mano, con la fragancia dorada a contraluz',
  },
  {
    key: 'taller',
    label: 'Nuestro taller',
    video: studioVideo,
    poster: { avif: studioPosterAvif, webp: studioPosterWebp, jpg: studioPosterJpg },
    alt: 'Frascos de Narciso Parfum recién envasados en el taller',
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
    <section id="proceso" className="scroll-mt-20 bg-cream-100 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="section-eyebrow text-gold-600">Hecho a mano</p>
          <h2 className="mt-3 font-display text-3xl text-balance text-ink-900 sm:text-4xl">
            Así nace cada fragancia
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-ink-500 sm:text-lg">
            Cada frasco se dosifica, diluye y envasa a mano en Ibagué. Así se ve el
            proceso real, de principio a fin.
          </p>
        </Reveal>
      </div>

      <Reveal delay={100} className="mx-auto mt-10 max-w-sm px-6 sm:mt-12 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-ink-900 shadow-lg">
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
                <span className="absolute inset-0 bg-ink-900/20 transition-colors group-hover:bg-ink-900/35" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
                    <IconPlay className="h-6 w-6 translate-x-0.5 sm:h-7 sm:w-7" />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-ink-900/70 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-50">
                  {current.label}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3" role="tablist" aria-label="Videos de Narciso Parfum">
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
                  active === i ? 'border-gold-500' : 'border-transparent'
                }`}
              >
                <img src={clip.poster.jpg} alt="" className="h-full w-full object-cover" loading="lazy" />
              </span>
              <span className="font-body text-[10px] uppercase tracking-wide text-ink-500 group-hover:text-ink-900">
                {clip.label}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
