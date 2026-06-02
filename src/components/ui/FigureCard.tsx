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
      className="group bg-card border border-border/60 rounded-sm p-5 cursor-pointer hover:border-cinnabar/20 hover:shadow-[0_12px_32px_-12px_rgba(61,50,38,0.15)] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-heading text-lg font-bold text-ink">
            {figure.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-cinnabar/8 text-cinnabar px-2 py-0.5 rounded-sm">
              {categoryLabel[figure.category]}
            </span>
            <span className="text-xs text-ink-muted/50 font-body-sans">
              {figure.birthYear}—{figure.deathYear}
            </span>
          </div>
          <p className="text-xs text-ink-muted/60 mt-1 font-body-sans">
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
      <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed font-body-sans">
        {figure.biography}
      </p>
      {figure.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {figure.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-cinnabar/5 text-ink-muted/60 px-1.5 py-0.5 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
