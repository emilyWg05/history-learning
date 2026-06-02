import { useEffect } from 'react'
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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
    )
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))
    return () => els.forEach((el) => observer.unobserve(el))
  }, [events])

  if (!era) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-24 text-center"
      >
        <p className="text-ink-muted">朝代未找到</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="py-8"
    >
      <div className="text-center pt-1 pb-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-ink">
          {era.name}大事年表
        </h1>
        <p className="mt-2 text-ink-muted text-sm font-sans-cn">
          {era.startYear}年 — {era.endYear}年 · 共 {events.length} 件大事
        </p>
        <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-cinnabar/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto">
        <TimelineComponent
          events={events}
          eraId={era.id}
          periods={era.periods}
        />
      </div>
    </motion.div>
  )
}
