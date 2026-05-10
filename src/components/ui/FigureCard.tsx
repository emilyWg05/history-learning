import type { Figure } from '../../types/content'
import BookmarkButton from './BookmarkButton'

const categoryLabel: Record<string, string> = {
  politics: '政治',
  military: '军事',
  culture: '文化',
  science: '科技',
  art: '艺术',
}

interface Props {
  figure: Figure
  onClick?: () => void
}

export default function FigureCard({ figure, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group bg-paper-light border border-border rounded-lg p-5 cursor-pointer hover:border-ochre/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-heading text-lg font-semibold text-ink">
            {figure.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-ochre/10 text-ochre px-2 py-0.5 rounded">
              {categoryLabel[figure.category]}
            </span>
            <span className="text-xs text-ink-light/50">
              {figure.birthYear}—{figure.deathYear}
            </span>
          </div>
          <p className="text-xs text-ink-light/60 mt-1">
            {figure.courtesyName && `字${figure.courtesyName}`}
            {figure.pseudonym && ` · 号${figure.pseudonym}`}
          </p>
        </div>
        <BookmarkButton
          type="figure"
          itemId={figure.id}
          eraId="song"
          title={figure.name}
        />
      </div>
      <p className="text-sm text-ink-light line-clamp-3 leading-relaxed">
        {figure.biography}
      </p>
      {figure.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {figure.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-border/30 text-ink-light/70 px-1.5 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
