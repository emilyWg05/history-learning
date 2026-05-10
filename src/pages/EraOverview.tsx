import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { eras } from '../data/eras'
import { songOverview } from '../data/song'
import { yuanOverview } from '../data/yuan'
import { mingOverview } from '../data/ming'
import { tangOverview } from '../data/tang'
import { MODULE_LABELS } from '../types/era'

const eraOverviews: Record<string, typeof songOverview> = {
  song: songOverview,
  yuan: yuanOverview,
  ming: mingOverview,
  tang: tangOverview,
}

export default function EraOverview() {
  const { eraId } = useParams()
  const era = eras.find((e) => e.id === eraId)

  if (!era) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-light">未找到该时代</p>
        <Link to="/" className="text-ochre hover:underline mt-4 inline-block">返回首页</Link>
      </div>
    )
  }

  const overview = eraId ? eraOverviews[eraId] ?? null : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold text-ink mb-3">
          {era.name}
        </h1>
        <p className="text-ink-light/70">
          {era.startYear}年 — {era.endYear}年 · 共 {era.endYear - era.startYear} 年
        </p>
        <div className="decorative-line w-48 mx-auto mt-6" />
      </div>

      {overview && (
        <div className="bg-paper-light border border-border rounded-lg p-6 mb-10">
          {overview.sections.map((section, i) => (
            <div key={i} className="mb-6 last:mb-0">
              <h2 className="font-heading text-lg font-medium text-ochre mb-2 border-b border-border/30 pb-1">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-ink-light leading-relaxed mb-3 last:mb-0 hanging-indent">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mb-10">
        {era.periods.map((p) => (
          <div
            key={p.id}
            className="text-center bg-paper-light border border-border rounded-lg px-6 py-3"
          >
            <div className="font-heading text-ink font-medium">{p.name}</div>
            <div className="text-xs text-ink-light/60">
              {p.startYear}年 — {p.endYear}年
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-heading text-xl font-semibold text-ink mb-4 text-center">
        内容导航
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {era.modules
          .filter((m) => m.enabled)
          .map((mod) => (
            <Link
              key={mod.id}
              to={`/${era.id}/${mod.id}`}
              className="group bg-paper-light border border-border rounded-lg p-4 text-center hover:border-ochre/30 hover:shadow-md transition-all duration-300"
            >
              <span className="font-heading text-ink group-hover:text-ochre transition-colors">
                {MODULE_LABELS[mod.id as keyof typeof MODULE_LABELS] ?? mod.label}
              </span>
            </Link>
          ))}
      </div>
    </motion.div>
  )
}
