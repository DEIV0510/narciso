import { useEffect, useState } from 'react'
import logo from '../assets/img/logo.webp'
import { brand, navLinks, waLink, waMessages } from '../data/site'
import { IconInstagram, IconTikTok, IconMenu, IconClose, IconWhatsApp, IconBag } from './icons'
import SectionLink from './SectionLink'
import { useCart } from '../context/CartContext'

function CartButton({ className = '' }) {
  const { totalItems, openCart } = useCart()
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={totalItems > 0 ? `Ver carrito, ${totalItems} productos` : 'Ver carrito'}
      className={`relative flex items-center justify-center text-ink-600 transition-colors hover:text-gold-600 ${className}`}
    >
      <IconBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span
          key={totalItems}
          className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 font-body text-[10px] font-medium leading-none text-ink-900 motion-safe:animate-bump"
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
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-cream-50/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <SectionLink href="#inicio" className="flex items-center gap-2" aria-label="Narciso Parfum, inicio">
          <img src={logo} alt="Narciso Parfum" className="h-9 w-auto sm:h-11" width={220} height={110} />
        </SectionLink>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {navLinks.map((l) => (
            <SectionLink
              key={l.href}
              href={l.href}
              className="font-body text-sm uppercase tracking-wide text-ink-600 transition-colors hover:text-gold-600"
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
            aria-label="Instagram de Narciso Parfum"
            className="text-ink-500 transition-colors hover:text-gold-600"
          >
            <IconInstagram />
          </a>
          <a
            href={brand.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Narciso Parfum"
            className="text-ink-500 transition-colors hover:text-gold-600"
          >
            <IconTikTok />
          </a>
          <CartButton />
          <a
            href={waLink(waMessages.catalog)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink-900 px-5 py-2.5 font-body text-xs uppercase tracking-wide text-cream-50 transition-colors hover:bg-gold-600"
          >
            Comprar por WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <CartButton className="h-11 w-11 rounded-full border border-ink-200" />
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-700"
          >
            {isOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        {...(isOpen ? {} : { inert: '' })}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav
          className="min-h-0 overflow-hidden border-t border-ink-100 bg-cream-50 px-4"
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <SectionLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-body text-sm uppercase tracking-wide text-ink-700 hover:bg-cream-200"
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
                className="flex h-11 w-11 items-center justify-center text-ink-500"
              >
                <IconInstagram />
              </a>
              <a
                href={brand.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-11 w-11 items-center justify-center text-ink-500"
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
