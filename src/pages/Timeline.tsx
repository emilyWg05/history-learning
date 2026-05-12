import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { eras } from '../data/eras'
import { songTimeline } from '../data/song'
import { yuanTimeline } from '../data/yuan'
import { mingTimeline } from '../data/ming'
import { tangTimeline } from '../data/tang'
import { wudaiTimeline } from '../data/wudai'
import TimelineComponent from '../components/ui/Timeline'
import type { TimelineEvent } from '../types/content'

const eraTimelines: Record<string, TimelineEvent[]> = {
  song: songTimeline,
  yuan: yuanTimeline,
  ming: mingTimeline,
  tang: tangTimeline,
  wudai: wudaiTimeline,
}

export default function Timeline() {
  const { eraId } = useParams()
  const era = eras.find((e) => e.id === eraId)
  const events = eraId ? (eraTimelines[eraId] ?? []) : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-heading text-3xl font-bold text-ink">大事年表</h1>
        <div className="decorative-line flex-1" />
      </div>

      <p className="text-sm text-ink-light/60 mb-8 text-center">
        {era?.startYear}年 — {era?.endYear}年 · 共 {events.length} 件大事
      </p>

      <TimelineComponent events={events} />
    </motion.div>
  )
}
