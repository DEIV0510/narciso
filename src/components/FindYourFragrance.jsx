import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { products, formatCOP } from '../data/products'
import { getProductImage } from '../data/productImages'
import { waLink } from '../data/site'
import { IconArrowRight, IconWhatsApp } from './icons'

const GENDERS = [
  { key: 'hombre', label: 'Hombre' },
  { key: 'mujer', label: 'Mujer' },
  { key: 'unisex', label: 'Unisex' },
]

const STYLES = [
  { key: 'Fresco', label: 'Fresco' },
  { key: 'Dulce', label: 'Dulce' },
  { key: 'Intenso', label: 'Intenso' },
  { key: 'Elegante', label: 'Elegante' },
]

export default function FindYourFragrance() {
  const [step, setStep] = useState(0)
  const [gender, setGender] = useState(null)
  const [style, setStyle] = useState(null)

  const results = useMemo(() => {
    if (!gender || !style) return []
    return products.filter((p) => p.gender === gender && p.style === style).slice(0, 4)
  }, [gender, style])

  function restart() {
    setStep(0)
    setGender(null)
    setStyle(null)
  }

  return (
    <section id="encuentra" className="scroll-mt-20 bg-cream-50 py-16 sm:scroll-mt-24 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal className="text-center">
          <p className="section-eyebrow text-gold-600">Encuentra tu fragancia</p>
          <h2 className="mt-3 font-display text-3xl text-balance text-ink-900 sm:text-4xl">
            ¿Buscas una fragancia para ti?
          </h2>
          <p className="mt-3 font-body text-sm text-ink-400 sm:text-base">
            Responde 2 preguntas rápidas y te mostramos opciones reales de nuestro catálogo.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 rounded-3xl border border-ink-100 bg-white p-6 shadow-sm sm:mt-10 sm:p-10">
          <div className="mx-auto flex max-w-[10rem] items-center gap-2">
            <span className={`h-1 flex-1 rounded-full ${step >= 0 ? 'bg-gold-500' : 'bg-ink-100'}`} />
            <span className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-gold-500' : 'bg-ink-100'}`} />
            <span className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-gold-500' : 'bg-ink-100'}`} />
          </div>

          {step === 0 && (
            <div className="mt-6 text-center">
              <p className="font-display text-lg text-ink-900">¿Para quién buscas la fragancia?</p>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => {
                      setGender(g.key)
                      setStep(1)
                    }}
                    className="rounded-2xl border border-ink-100 py-5 font-body text-sm uppercase tracking-wide text-ink-700 transition-colors hover:border-gold-400 hover:text-ink-900"
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-6 text-center">
              <p className="font-display text-lg text-ink-900">¿Qué estilo prefieres?</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {STYLES.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      setStyle(s.key)
                      setStep(2)
                    }}
                    className="rounded-2xl border border-ink-100 py-5 font-body text-sm uppercase tracking-wide text-ink-700 transition-colors hover:border-gold-400 hover:text-ink-900"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mt-5 font-body text-xs uppercase tracking-wide text-ink-400 hover:text-ink-700"
              >
                ← Volver
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6">
              <p className="text-center font-display text-lg text-ink-900">
                Estilo {style} · Para {GENDERS.find((g) => g.key === gender)?.label.toLowerCase()}
              </p>

              {results.length === 0 ? (
                <p className="mt-4 text-center font-body text-sm text-ink-400">
                  No encontramos una combinación exacta — escríbenos por WhatsApp y te ayudamos a elegir.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {results.map((p) => {
                    const message = `Hola, Narciso Parfum. Estoy interesado/a en comprar el perfume ${p.fullName} por $${p.price.toLocaleString('es-CO')}. ¿Me pueden confirmar disponibilidad?`
                    const img = getProductImage(p.image)
                    return (
                      <div
                        key={p.id}
                        className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 transition-shadow hover:shadow-md"
                      >
                        <Link to={`/perfumes/${p.id}`} className="block">
                          <span className="block aspect-square w-full overflow-hidden bg-white">
                            <picture>
                              <source srcSet={img.avif} type="image/avif" />
                              <source srcSet={img.webp} type="image/webp" />
                              <img
                                src={img.jpg}
                                alt={`Narciso Parfum — ${p.fullName}`}
                                className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                width={200}
                                height={200}
                              />
                            </picture>
                          </span>
                          <span className="block p-2.5">
                            <span className="line-clamp-2 block font-display text-xs leading-tight text-ink-900">
                              {p.title}
                            </span>
                            <span className="mt-1 block font-display text-xs text-gold-600">{formatCOP(p.price)}</span>
                          </span>
                        </Link>
                        <a
                          href={waLink(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Comprar ${p.fullName} por WhatsApp`}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-ink-900 shadow-sm transition-transform duration-200 hover:scale-105"
                        >
                          <IconWhatsApp className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-wide text-ink-600 hover:text-ink-900"
                >
                  Ver catálogo completo
                  <IconArrowRight className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="font-body text-xs uppercase tracking-wide text-ink-400 hover:text-ink-700"
                >
                  Volver a empezar
                </button>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
