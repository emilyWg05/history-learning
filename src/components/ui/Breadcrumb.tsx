import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  items: Crumb[]
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink-light/60 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
          {item.href ? (
            <Link to={item.href} className="hover:text-ochre transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
