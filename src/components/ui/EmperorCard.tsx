import type { Emperor } from '../../types/content'
import BookmarkButton from './BookmarkButton'

interface Props {
  emperor: Emperor
  onClick?: () => void
}

export default function EmperorCard({ emperor, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group bg-paper-light border border-border rounded-lg p-5 cursor-pointer hover:border-ochre/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-ink-light/50">
            {emperor.periodId === 'northern-song' ? '北宋' : '南宋'}
          </div>
          <h3 className="font-heading text-xl font-semibold text-ink mt-1">
            宋{emperor.templeName}
          </h3>
          <p className="text-sm text-ink-light mt-0.5">
            {emperor.name} · 年号：{emperor.reignTitle}
          </p>
        </div>
        <BookmarkButton
          type="emperor"
          itemId={emperor.id}
          eraId="song"
          title={`宋${emperor.templeName}（${emperor.name}）`}
        />
      </div>
      <p className="text-xs text-ink-light/60 mb-2">
        在位：{emperor.reignStart}年—{emperor.reignEnd}年
        {emperor.reignEnd > emperor.reignStart
          ? `（共${emperor.reignEnd - emperor.reignStart}年）`
          : ''}
      </p>
      <p className="text-sm text-ink-light line-clamp-3 leading-relaxed">
        {emperor.biography}
      </p>
      {emperor.achievements.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {emperor.achievements.map((a) => (
            <span
              key={a}
              className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded"
            >
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
