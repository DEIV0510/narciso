import { useEffect, useMemo, useState } from 'react'
import { CATEGORIES, brands, products, searchProducts } from '../data/products'
import ProductCard from './ProductCard'
import ProductRow from './ProductRow'
import Reveal from './Reveal'
import { IconSearch } from './icons'

const CATEGORY_FILTERS = [
  { key: 'todos', label: 'Todos' },
  { key: 'caballero', label: 'Caballeros' },
  { key: 'dama', label: 'Damas' },
  { key: 'unisex', label: 'Unisex' },
]

const SORTS = [
  { key: 'orden', label: 'Orden del catálogo' },
  { key: 'precio-asc', label: 'Menor precio' },
  { key: 'precio-desc', label: 'Mayor precio' },
  { key: 'az', label: 'Nombre A–Z' },
]

const SECTION_DEFS = [
  { key: CATEGORIES.CABALLERO, label: 'Perfumería Caballero', filterKey: 'caballero' },
  { key: CATEGORIES.DAMA, label: 'Perfumería Dama', filterKey: 'dama' },
  { key: CATEGORIES.UNISEX, label: 'Perfumería Unisex', filterKey: 'unisex' },
]

export default function Catalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todos')
  const [brand, setBrand] = useState('todas')
  const [sort, setSort] = useState('orden')

  useEffect(() => {
    function handler(e) {
      setCategory(e.detail)
      setQuery('')
    }
    window.addEventListener('narciso:filter-category', handler)
    return () => window.removeEventListener('narciso:filter-category', handler)
  }, [])

  const sections = useMemo(() => {
    return SECTION_DEFS.filter((def) => category === 'todos' || category === def.filterKey).map((def) => {
      let list = products.filter((p) => p.category === def.key)
      if (brand !== 'todas') list = list.filter((p) => p.brand === brand)
      if (query.trim()) list = searchProducts(list, query)

      if (sort === 'precio-asc') list = [...list].sort((a, b) => a.price - b.price)
      if (sort === 'precio-desc') list = [...list].sort((a, b) => b.price - a.price)
      if (sort === 'az') list = [...list].sort((a, b) => a.title.localeCompare(b.title, 'es'))

      return { ...def, items: list }
    })
  }, [query, category, brand, sort])

  const totalCount = sections.reduce((sum, s) => sum + s.items.length, 0)

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 border-y border-ink-100 bg-cream-50 py-16 sm:scroll-mt-24 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="section-eyebrow text-gold-600">Catálogo completo</p>
          <h2 className="mt-3 font-display text-3xl text-balance text-ink-900 sm:text-4xl">
            Descubre tu fragancia
          </h2>
          <p className="mt-3 font-body text-sm text-ink-400 sm:text-base">
            {products.length} fragancias inspiradas, mismo frasco Narciso. $60.000 COP cada una.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 space-y-4 sm:mt-10">
          <div className="relative mx-auto max-w-md">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o marca…"
              aria-label="Buscar perfume por nombre o marca"
              className="w-full rounded-full border border-ink-100 bg-white py-3 pl-11 pr-4 font-body text-sm text-ink-900 placeholder:text-ink-400 focus:border-gold-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setCategory(f.key)}
                aria-pressed={category === f.key}
                className={`min-h-11 rounded-full border px-4 font-body text-xs uppercase tracking-wide transition-colors sm:text-sm ${
                  category === f.key
                    ? 'border-gold-500 bg-gold-500 text-ink-900'
                    : 'border-ink-100 bg-white text-ink-600 hover:border-ink-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <label className="flex items-center gap-2 font-body text-xs text-ink-500">
              Marca
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="min-h-11 rounded-full border border-ink-100 bg-white px-3 font-body text-xs text-ink-900 sm:text-sm"
              >
                <option value="todas">Todas</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-2 font-body text-xs text-ink-500">
              Ordenar
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-h-11 rounded-full border border-ink-100 bg-white px-3 font-body text-xs text-ink-900 sm:text-sm"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        {totalCount === 0 ? (
          <p className="mt-16 text-center font-body text-sm text-ink-400">
            No encontramos fragancias con ese criterio. Prueba con otro nombre o marca.
          </p>
        ) : (
          <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-14">
            {sections.map(
              (section) =>
                section.items.length > 0 && (
                  <div key={section.key}>
                    <div className="mb-4 flex items-baseline gap-3 sm:mb-6">
                      <h3 className="whitespace-nowrap font-display text-xl text-ink-900 sm:text-2xl">
                        {section.label}
                      </h3>
                      <span className="font-body text-xs text-ink-400">{section.items.length}</span>
                    </div>

                    <ProductRow>
                      {section.items.map((product, i) => (
                        <ProductCard key={product.id} product={product} eager={i < 4} />
                      ))}
                    </ProductRow>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </section>
  )
}
