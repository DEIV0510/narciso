import { brand, navLinks, waLink, waMessages } from '../data/site'
import { IconInstagram, IconTikTok } from './icons'
import SectionLink from './SectionLink'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink-900 pt-14 sm:pt-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <div className="grid gap-10 border-b border-cream-50/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl text-cream-50">NARCISO PARFUM</p>
            <p className="mt-2 font-body text-sm text-ink-300">Perfumería de alta calidad</p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest2 text-gold-400">Ubicación</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-300">
              {brand.address.line1}
              <br />
              {brand.city}
            </p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest2 text-gold-400">Contacto</p>
            <a
              href={waLink(waMessages.catalog)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block font-body text-sm text-ink-300 hover:text-gold-300"
            >
              WhatsApp: {brand.whatsappDisplay}
            </a>
            <div className="mt-2 flex items-center gap-2">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-ink-300 hover:text-gold-300"
              >
                <IconInstagram className="h-4 w-4" />
              </a>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center text-ink-300 hover:text-gold-300"
              >
                <IconTikTok className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest2 text-gold-400">Enlaces</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <SectionLink href={l.href} className="font-body text-sm text-ink-300 hover:text-gold-300">
                    {l.label}
                  </SectionLink>
                </li>
              ))}
              <li>
                <a
                  href={waLink(waMessages.catalog)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink-300 hover:text-gold-300"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="py-6 text-center font-body text-xs text-ink-300">
          © {year} Narciso Parfum. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
