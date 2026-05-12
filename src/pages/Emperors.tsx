import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { songEmperors, songTimeline } from '../data/song'
import { yuanEmperors, yuanTimeline } from '../data/yuan'
import { mingEmperors, mingTimeline } from '../data/ming'
import { tangEmperors, tangTimeline } from '../data/tang'
import { wudaiEmperors, wudaiTimeline } from '../data/wudai'
import { eras } from '../data/eras'
import BookmarkButton from '../components/ui/BookmarkButton'
import type { Emperor, TimelineEvent } from '../types/content'

const eraEmperors: Record<string, Emperor[]> = {
  song: songEmperors,
  yuan: yuanEmperors,
  ming: mingEmperors,
  tang: tangEmperors,
  wudai: wudaiEmperors,
}

const eraTimelines: Record<string, TimelineEvent[]> = {
  song: songTimeline,
  yuan: yuanTimeline,
  ming: mingTimeline,
  tang: tangTimeline,
  wudai: wudaiTimeline,
}

const categoryStyle: Record<string, string> = {
  political: 'bg-ochre/10 border-ochre/30 text-ochre',
  military: 'bg-seal/10 border-seal/30 text-seal',
  economic: 'bg-gold/10 border-gold/30 text-gold',
  cultural: 'bg-jade/10 border-jade/30 text-jade',
  social: 'bg-inkwash/10 border-inkwash/30 text-inkwash',
  diplomatic: 'bg-jade/10 border-jade/30 text-jade',
}

function EmperorTimelineCard({
  emperor,
  index,
  reignEvents,
  onShowEvents,
  eraId,
  periodLabel,
}: {
  emperor: Emperor
  index: number
  reignEvents: TimelineEvent[]
  onShowEvents: () => void
  eraId: string
  periodLabel: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.03 }}
      className="relative pl-10"
    >
      <div className="absolute left-0 top-[22px] w-2.5 h-2.5 rounded-full bg-ochre border-2 border-paper z-10 ring-2 ring-border/30 -translate-y-1/2 -translate-x-1/2" />

      <div className="bg-paper-light border border-border rounded-lg p-5 hover:shadow-md transition-shadow ml-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-ink-light/50">
              {periodLabel} · 第{index + 1}位
            </span>
            <h3 className="font-heading text-xl font-semibold text-ink mt-0.5">
              {emperor.templeName
                ? `${emperor.templeName}`
                : emperor.name}
              {emperor.templeName && (
                <span className="text-sm text-ink-light font-normal ml-2">
                  {emperor.name}
                </span>
              )}
            </h3>
            <p className="text-xs text-ink-light/60 mt-1">
              在位：{emperor.reignStart}年—{emperor.reignEnd}年
              {emperor.reignEnd > emperor.reignStart
                ? `（共${emperor.reignEnd - emperor.reignStart}年）`
                : ''}
            </p>
            <p className="text-xs text-ink-light/60 mt-0.5">
              年号：{emperor.reignTitle}
            </p>
          </div>
          <BookmarkButton
            type="emperor"
            itemId={emperor.id}
            eraId={eraId}
            title={`${emperor.templeName ? emperor.templeName : ''}（${emperor.name}）`}
          />
        </div>

        <p className="text-sm text-ink-light leading-relaxed mb-3">
          {emperor.biography}
        </p>

        {emperor.achievements.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-ink-light/50 mr-2">成就</span>
            {emperor.achievements.map((a) => (
              <span
                key={a}
                className="inline-block text-xs bg-gold/10 text-gold px-2 py-0.5 rounded mr-1 mb-1"
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {emperor.majorEvents.length > 0 && (
          <div className="mb-3">
            <span className="text-xs text-ink-light/50 mr-2">相关事件</span>
            {emperor.majorEvents.map((e) => (
              <span
                key={e}
                className="inline-block text-xs bg-seal/5 text-ink-light/70 px-2 py-0.5 rounded mr-1 mb-1"
              >
                {e}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={onShowEvents}
          className={`text-sm mt-2 transition-colors ${
            reignEvents.length > 0
              ? 'text-ochre hover:underline cursor-pointer'
              : 'text-ink-light/30 cursor-default'
          }`}
          disabled={reignEvents.length === 0}
        >
          {reignEvents.length > 0
            ? `查看在位大事记（${reignEvents.length}件）→`
            : '暂无在位大事记'}
        </button>
      </div>

      <div className="absolute left-0 top-[22px] -translate-y-1/2 text-xs text-ochre font-heading -translate-x-full pr-3 whitespace-nowrap">
        {emperor.reignStart}年
      </div>
    </motion.div>
  )
}

export default function Emperors() {
  const { eraId } = useParams()
  const [selectedEvents, setSelectedEvents] = useState<{ emperor: Emperor; events: TimelineEvent[] } | null>(null)

  const era = eras.find((e) => e.id === eraId)
  const emperors = eraId ? eraEmperors[eraId] ?? [] : []
  const timeline = eraId ? eraTimelines[eraId] ?? [] : []

  const getReignEvents = (emperor: Emperor): TimelineEvent[] =>
    timeline.filter((e) => e.year >= emperor.reignStart && e.year <= emperor.reignEnd)

  const periodsWithEmperors = era?.periods.map((period) => ({
    period,
    emperors: emperors.filter((e) => e.periodId === period.id),
  })) ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-heading text-3xl font-bold text-ink">君主图鉴</h1>
        <div className="decorative-line flex-1" />
      </div>

      {periodsWithEmperors.map(({ period, emperors: periodEmperors }, pi) => (
        <div key={period.id} className={pi > 0 ? 'mt-12' : ''}>
          <div className="mb-2">
            <h2 className="font-heading text-xl font-semibold text-ochre mb-1">
              {period.name} · {periodEmperors.length}帝
            </h2>
            <p className="text-xs text-ink-light/50 mb-6">
              {period.startYear}年 — {period.endYear}年 · 历{periodEmperors.length}帝{period.endYear - period.startYear}年
            </p>
          </div>

          <div className="relative pl-16">
            <div className="absolute left-[calc(4rem-0.5px)] top-0 bottom-0 w-px bg-border/40" />

            <div className="space-y-8">
              {periodEmperors.map((emperor, i) => (
                <EmperorTimelineCard
                  key={emperor.id}
                  emperor={emperor}
                  index={i}
                  reignEvents={getReignEvents(emperor)}
                  eraId={eraId ?? 'song'}
                  periodLabel={period.name}
                  onShowEvents={() =>
                    setSelectedEvents({ emperor, events: getReignEvents(emperor) })
                  }
                />
              ))}
            </div>
          </div>

          {/* Period end marker */}
          <div className="relative pl-16 mt-6">
            <div className="absolute left-[calc(4rem-4px)] top-0 w-2 h-2 rounded-full bg-seal/60 border border-paper" />
            <p className="text-xs text-ink-light/40 pl-4">
              {period.name}终 · {period.endYear}年
            </p>
          </div>
        </div>
      ))}

      {/* Events Modal */}
      <AnimatePresence>
        {selectedEvents && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4"
            onClick={() => setSelectedEvents(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-paper-light border border-border rounded-xl p-6 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-ink">
                    {selectedEvents.emperor.templeName || selectedEvents.emperor.name} · 在位大事记
                  </h2>
                  <p className="text-xs text-ink-light/60 mt-0.5">
                    {selectedEvents.emperor.name} · 在位{' '}
                    {selectedEvents.emperor.reignStart}—{selectedEvents.emperor.reignEnd}年
                    （共{selectedEvents.emperor.reignEnd - selectedEvents.emperor.reignStart}年）
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvents(null)}
                  className="text-ink-light hover:text-ink transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {selectedEvents.events.length === 0 ? (
                  <p className="text-sm text-ink-light/50 text-center py-8">暂无详细大事记</p>
                ) : (
                  selectedEvents.events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 bg-paper border border-border/50 rounded-lg p-3"
                    >
                      <span
                        className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${categoryStyle[event.category]}`}
                      >
                        {event.year}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-ink">
                          {event.title}
                        </h4>
                        <p className="text-xs text-ink-light/70 mt-0.5 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
