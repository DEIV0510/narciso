import { useState } from 'react'
import posterAvif from '../assets/img/craft-poster.avif'
import posterWebp from '../assets/img/craft-poster.webp'
import posterJpg from '../assets/img/craft-poster.jpg'
import craftVideo from '../assets/video/craft-process.mp4'
import Reveal from './Reveal'
import { IconPlay } from './icons'

export default function CraftProcess() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="proceso" className="scroll-mt-20 bg-cream-100 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal>
          <p className="section-eyebrow text-gold-600">Hecho a mano</p>
          <h2 className="mt-3 font-display text-3xl text-balance text-ink-900 sm:text-4xl">
            Así nace cada fragancia
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-500 sm:text-lg">
            Cada frasco se dosifica, diluye y envasa a mano en Ibagué, con precisión
            y el mismo cuidado de siempre. Así se ve el proceso real, de principio a
            fin.
          </p>
        </Reveal>

        <Reveal delay={100} className="overflow-hidden rounded-3xl shadow-lg">
          <div className="relative aspect-[4/5] w-full bg-ink-900">
            {playing ? (
              <video
                src={craftVideo}
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
                aria-label="Reproducir video: así se elabora Narciso Parfum"
                className="group relative block h-full w-full"
              >
                <picture>
                  <source srcSet={posterAvif} type="image/avif" />
                  <source srcSet={posterWebp} type="image/webp" />
                  <img
                    src={posterJpg}
                    alt="Elaborando una fragancia Narciso Parfum: dosificación de esencias en el taller"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={1000}
                    height={1340}
                  />
                </picture>
                <span className="absolute inset-0 bg-ink-900/20 transition-colors group-hover:bg-ink-900/35" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-ink-900 shadow-lg transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
                    <IconPlay className="h-6 w-6 translate-x-0.5 sm:h-7 sm:w-7" />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-ink-900/70 px-3 py-1.5 font-body text-[11px] uppercase tracking-wide text-cream-50">
                  Ver el proceso
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
