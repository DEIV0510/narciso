import { useEffect, useState } from 'react'
import logo from '../assets/img/logo.webp'
import { brand, navLinks, waLink, waMessages } from '../data/site'
import { IconInstagram, IconTikTok, IconMenu, IconClose, IconWhatsApp, IconBag } from './icons'
import { FlickerFlame } from './HalloweenFx'
import SectionLink from './SectionLink'
import { useCart } from '../context/CartContext'
import { HALLOWEEN_ACTIVE } from '../data/campaign'

function CartButton({ className = '' }) {
  const { totalItems, openCart } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={totalItems > 0 ? `Ver carrito, ${totalItems} productos` : 'Ver carrito'}
      className={`relative flex items-center justify-center text-cream-100 transition-colors hover:text-gold-300 ${className}`}
    >
      <IconBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span
          key={totalItems}
          className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-400 px-1 font-body text-[10px] font-medium leading-none text-night-950 shadow-[0_0_10px_rgba(233,138,60,0.55)] motion-safe:animate-bump"
        >
          {totalItems}
        </span>
      )}
    </button>
  )
}

export default function Header({ open, onOpenChange }) {
  const [localOpen, setLocalOpen] = useState(false)
  const isOpen = open ?? localOpen
  const setOpen = onOpenChange ?? setLocalOpen

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, setOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/15 bg-night-950/95 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.9)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <SectionLink
          href="#inicio"
          className="relative flex items-center gap-2"
          aria-label="Gentleman Co, inicio"
        >
          <img src={logo} alt="Gentleman Co" className="h-9 w-auto sm:h-11" width={277} height={220} />
          {HALLOWEEN_ACTIVE && (
            <FlickerFlame wrapperClassName="absolute -right-3 top-0" className="h-3.5 w-3.5 text-ember-400" />
          )}
        </SectionLink>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navLinks.map((l) => (
            <SectionLink
              key={l.href}
              href={l.href}
              className="hw-nav-link font-body text-sm uppercase tracking-wide text-cream-200/85 transition-colors hover:text-gold-300"
            >
              {l.label}
            </SectionLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Gentleman Co"
            className="text-cream-200/70 transition-colors hover:text-gold-300"
          >
            <IconInstagram />
          </a>
          <a
            href={brand.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Gentleman Co"
            className="text-cream-200/70 transition-colors hover:text-gold-300"
          >
            <IconTikTok />
          </a>
          <CartButton />
          <a
            href={waLink(waMessages.catalog)}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-btn-glow rounded-full border border-gold-400/60 px-5 py-2.5 font-body text-xs uppercase tracking-wide text-gold-200 hover:border-gold-400 hover:bg-gold-500 hover:text-night-950"
          >
            Comprar por WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <CartButton className="h-11 w-11 rounded-full border border-gold-500/30" />
          <a
            href={waLink(waMessages.catalog)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Comprar por WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-ink-900"
          >
            <IconWhatsApp className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-cream-100"
          >
            {isOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {HALLOWEEN_ACTIVE && <div aria-hidden="true" className="hw-top-line h-px" />}

      <div
        id="mobile-nav"
        {...(isOpen ? {} : { inert: '' })}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav
          className="min-h-0 overflow-hidden border-t border-gold-500/15 bg-night-900 px-4"
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <SectionLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-body text-sm uppercase tracking-wide text-cream-100 transition-colors hover:bg-night-700 hover:text-gold-300"
              >
                {l.label}
              </SectionLink>
            ))}
            <div className="mt-2 flex items-center gap-3 px-1 py-2">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center text-cream-200/70 hover:text-gold-300"
              >
                <IconInstagram />
              </a>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center text-cream-200/70 hover:text-gold-300"
              >
                <IconTikTok />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
