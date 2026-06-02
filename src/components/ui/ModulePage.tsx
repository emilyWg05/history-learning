import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import type { Article } from '../../types/content'
import ArticleView from './ArticleView'

interface Props {
  title: string
  articles: Article[]
}

export default function ModulePage({ title, articles }: Props) {
  const { eraId } = useParams()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-heading text-3xl font-bold text-ink shrink-0">{title}</h1>
          <div className="decorative-line flex-1" />
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ink-muted font-body-sans">内容整理中，敬请期待</p>
            <Link to={`/${eraId}`} className="text-cinnabar hover:underline mt-4 inline-block font-heading tracking-[0.15em] text-sm">
              返回总览
            </Link>
          </div>
        ) : (
          articles.map((article) => (
            <ArticleView key={article.id} article={article} />
          ))
        )}
      </div>
    </motion.div>
  )
}
