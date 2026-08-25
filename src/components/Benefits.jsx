import Reveal from './Reveal'
import { benefits } from '../data/site'
import { IconSparkle, IconLeaf, IconHeart, IconChat } from './icons'

const icons = [IconSparkle, IconLeaf, IconHeart, IconChat]

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="border-b border-ink-100 bg-cream-50 py-10 sm:py-12">
      <h2 id="benefits-heading" className="sr-only">
        Beneficios
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 sm:px-8 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {benefits.map((b, i) => {
          const Icon = icons[i]
          return (
            <Reveal key={b.title} delay={i * 80} className="flex flex-col items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base leading-snug text-ink-900 sm:text-lg">{b.title}</h3>
              <p className="font-body text-xs text-ink-400 sm:text-sm">{b.desc}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
