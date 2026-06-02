import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { eras } from '../data/eras'
import { songOverview } from '../data/song'
import { yuanOverview } from '../data/yuan'
import { mingOverview } from '../data/ming'
import { tangOverview } from '../data/tang'
import { wudaiOverview } from '../data/wudai'

const eraOverviews: Record<string, typeof songOverview> = {
  song: songOverview,
  yuan: yuanOverview,
  ming: mingOverview,
  tang: tangOverview,
  wudai: wudaiOverview,
}

export default function EraOverview() {
  const { eraId } = useParams()
  const era = eras.find((e) => e.id === eraId)

  if (!era) {
    return (
      <div className="text-center py-20">
        <p className="text-ink-muted">未找到该时代</p>
        <Link to="/" className="text-cinnabar hover:underline mt-4 inline-block font-heading tracking-[0.15em]">返回首页</Link>
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
      {/* Hero */}
      <div className="text-center pt-1 pb-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
          {era.name}
        </h1>
        <p className="mt-2 text-ink-muted text-sm font-sans-cn">
          {era.startYear}年 — {era.endYear}年 · 共 {era.endYear - era.startYear} 年
        </p>
        <div className="h-px w-32 mx-auto mt-4 bg-gradient-to-r from-transparent via-cinnabar/40 to-transparent" />
      </div>

      {/* Periods */}
      <div className="max-w-3xl mx-auto mb-5">
        <div className="flex flex-wrap gap-3">
          {era.periods.map((p) => (
            <div
              key={p.id}
              className="flex-1 text-center bg-card border border-border/60 rounded-sm px-6 py-2.5 hover:border-cinnabar/20 hover:shadow-[0_4px_16px_-8px_rgba(61,50,38,0.12)] transition-all duration-300"
            >
              <div className="font-heading text-ink font-bold tracking-[0.1em]">{p.name}</div>
              <div className="text-xs text-ink-muted/60 mt-0.5 font-body-sans">
                {p.startYear}年 — {p.endYear}年
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      {overview && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border/60 rounded-sm p-6 md:p-8">
            {overview.sections.map((section, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <h2 className="font-heading text-base font-bold text-cinnabar mb-3 pb-2 border-b border-border/30 tracking-[0.15em]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-ink-muted leading-relaxed mb-3 last:mb-0 hanging-indent font-body-sans">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
