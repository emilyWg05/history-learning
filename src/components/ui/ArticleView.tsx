import type { Article } from '../../types/content'
import BookmarkButton from './BookmarkButton'

interface Props {
  article: Article
}

export default function ArticleView({ article }: Props) {
  return (
    <div className="bg-card border border-border/60 rounded-sm p-6 md:p-8 mb-8">
      <div className="flex items-start justify-between mb-4">
        <h2 className="font-heading text-xl font-bold text-ink">
          {article.title}
        </h2>
        <BookmarkButton
          type="article"
          itemId={article.id}
          eraId={article.eraId}
          title={article.title}
        />
      </div>

      <p className="text-ink-muted leading-relaxed mb-6 hanging-indent font-body-sans">
        {article.summary}
      </p>

      <div className="space-y-6">
        {article.sections.map((section, i) => (
          <div key={i}>
            <h3 className="font-heading text-base font-bold text-cinnabar mb-2 pb-1 border-b border-border/30 tracking-[0.15em]">
              {section.heading}
            </h3>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-ink-muted leading-relaxed mb-3 last:mb-0 hanging-indent font-body-sans">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border/30">
          {article.tags.map((t) => (
            <span key={t} className="text-xs bg-cinnabar/5 text-ink-muted/60 px-2 py-0.5 rounded-sm">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
