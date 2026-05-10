import { Link, useLocation, useParams } from 'react-router-dom'
import { eras } from '../../data/eras'
import { MODULE_LABELS } from '../../types/era'
import EraSelector from './EraSelector'

const moduleNav = [
  { id: 'home', label: '首页' },
  { id: 'emperors', label: '君主图鉴' },
  { id: 'politics', label: '政治' },
  { id: 'economy', label: '经济' },
  { id: 'culture', label: '文化' },
  { id: 'military', label: '军事' },
  { id: 'diplomacy', label: '外交' },
  { id: 'society', label: '社会' },
  { id: 'ethnic-groups', label: '民族' },
  { id: 'figures', label: '人物志' },
  { id: 'timeline', label: '大事年表' },
]

function useBreadcrumbs() {
  const { eraId } = useParams()
  const location = useLocation()
  const crumbs: { label: string; href?: string }[] = [{ label: '史鉴', href: '/' }]

  if (location.pathname === '/') return crumbs

  const era = eras.find(e => e.id === eraId)
  if (location.pathname === '/review') {
    crumbs.push({ label: '复习清单' })
    return crumbs
  }

  if (eraId && era) {
    crumbs.push({ label: era.name, href: `/${eraId}` })
  }

  if (eraId) {
    const segments = location.pathname.split('/').filter(Boolean)
    const moduleId = segments[1]
    if (moduleId && moduleId in MODULE_LABELS) {
      const label = MODULE_LABELS[moduleId as keyof typeof MODULE_LABELS]
      if (label) crumbs.push({ label })
    }
  }

  return crumbs
}

export default function Header() {
  const { eraId } = useParams()
  const location = useLocation()
  const breadcrumbs = useBreadcrumbs()

  return (
    <header className="relative z-20 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="font-heading text-2xl font-bold text-ink tracking-wide hover:text-ochre transition-colors"
          >
            史鉴
          </Link>
          <div className="flex items-center gap-4">
            <EraSelector currentEraId={eraId} />
            <Link
              to="/review"
              className="text-sm text-ink-light hover:text-seal transition-colors"
            >
              复习清单
            </Link>
          </div>
        </div>

        {/* Breadcrumb path */}
        {location.pathname !== '/' && (
          <nav className="flex items-center gap-1.5 text-sm text-ink-light/60 pb-4">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-ochre transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Module navigation */}
        {eraId && eras.some(e => e.id === eraId) && (
          <nav className="flex gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {moduleNav.map((mod) => {
              const path = mod.id === 'home' ? `/${eraId}` : `/${eraId}/${mod.id}`
              const isActive = mod.id === 'home'
                ? location.pathname === `/${eraId}`
                : location.pathname === path
              return (
                <Link
                  key={mod.id}
                  to={path}
                  className={`shrink-0 px-3 py-1.5 text-sm rounded transition-colors ${
                    isActive
                      ? 'bg-ochre/10 text-ochre font-medium'
                      : 'text-ink-light hover:text-ink hover:bg-border/30'
                  }`}
                >
                  {mod.label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
