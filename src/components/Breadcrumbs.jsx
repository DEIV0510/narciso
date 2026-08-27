import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Ruta de navegación" className="font-body text-xs text-ink-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="hover:text-ink-700">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-600" aria-current={i === items.length - 1 ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
