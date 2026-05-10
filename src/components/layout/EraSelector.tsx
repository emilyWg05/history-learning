import { Link } from 'react-router-dom'
import { eras } from '../../data/eras'
import type { Era } from '../../types/era'

interface Props {
  currentEraId?: string
}

export default function EraSelector({ currentEraId }: Props) {
  const chineseEras = eras.filter(e => e.category === 'chinese')
  const globalEras = eras.filter(e => e.category === 'global')

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm text-ink-light hover:text-ink transition-colors">
        <span>{currentEraId ? eras.find(e => e.id === currentEraId)?.name ?? '选择时代' : '选择时代'}</span>
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-paper-light border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          <EraGroup label="中国历史" eras={chineseEras} />
          {globalEras.length > 0 && <EraGroup label="全球历史" eras={globalEras} />}
        </div>
      </div>
    </div>
  )
}

function EraGroup({ label, eras }: { label: string; eras: Era[] }) {
  return (
    <div>
      <div className="text-xs text-ink-light/60 px-3 py-1.5 font-medium">{label}</div>
      {eras.map(era => (
        <Link
          key={era.id}
          to={`/${era.id}`}
          className="block px-3 py-2 text-sm text-ink hover:bg-ochre/5 rounded transition-colors"
        >
          <span>{era.name}</span>
          <span className="text-ink-light/50 text-xs ml-2">
            {era.startYear}–{era.endYear}
          </span>
        </Link>
      ))}
    </div>
  )
}
