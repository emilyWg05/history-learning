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
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-heading text-3xl font-bold text-ink">{title}</h1>
        <div className="decorative-line flex-1" />
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink-light">内容整理中，敬请期待</p>
          <Link to={`/${eraId}`} className="text-ochre hover:underline mt-4 inline-block text-sm">
            返回总览
          </Link>
        </div>
      ) : (
        articles.map((article) => (
          <ArticleView key={article.id} article={article} />
        ))
      )}
    </motion.div>
  )
}
