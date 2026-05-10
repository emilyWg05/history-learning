import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { eras } from '../data/eras'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-12"
    >
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-ink mb-4 tracking-wider">
          史鉴
        </h1>
        <p className="text-ink-light text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          以史为鉴，可以知兴替。
        </p>
        <p className="text-ink-light/60 text-sm mt-3">
          沉浸式历史学习平台 — 从唐代开始，探索中华文明的辉煌
        </p>
        <div className="decorative-line w-64 mx-auto mt-8" />
      </div>

      {/* Era cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {eras.map((era) => (
          <Link
            key={era.id}
            to={`/${era.id}`}
            className="group block bg-paper-light border border-border rounded-lg p-6 hover:border-ochre/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-2xl font-semibold text-ink group-hover:text-ochre transition-colors">
                {era.name}
              </h2>
              <span className="text-xs text-ink-light/50 bg-border/30 px-2 py-0.5 rounded">
                {era.category === 'chinese' ? '中国历史' : '全球历史'}
              </span>
            </div>
            <p className="text-sm text-ink-light mb-4 line-clamp-3">
              {era.overview}
            </p>
            <div className="flex items-center gap-2 text-xs text-ink-light/60">
              <span>{era.startYear}年</span>
              <span>—</span>
              <span>{era.endYear}年</span>
              <span className="text-seal ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                进入 →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Placeholder for future eras */}
      <div className="text-center mt-12">
        <p className="text-xs text-ink-light/40">
          更多时代即将开放 · 汉朝 · 清朝 · 全球史
        </p>
      </div>
    </motion.div>
  )
}
