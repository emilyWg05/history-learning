import type { Article } from '../../types/content'
import BookmarkButton from './BookmarkButton'
import Card from './Card'

interface Props {
  article: Article
}

export default function ArticleView({ article }: Props) {
  return (
    <Card hover={false} className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          {article.title}
        </h2>
        <BookmarkButton
          type="article"
          itemId={article.id}
          eraId={article.eraId}
          title={article.title}
        />
      </div>

      <p className="text-ink-light/80 leading-relaxed mb-6 hanging-indent">
        {article.summary}
      </p>

      <div className="space-y-6">
        {article.sections.map((section, i) => (
          <div key={i}>
            <h3 className="font-heading text-lg font-medium text-ochre mb-2 border-b border-border/50 pb-1">
              {section.heading}
            </h3>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-ink-light leading-relaxed mb-3 hanging-indent">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border/30">
          {article.tags.map((t) => (
            <span key={t} className="text-xs bg-ochre/5 text-ink-light/60 px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}
