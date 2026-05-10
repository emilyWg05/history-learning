import { motion } from 'framer-motion'
import type { TimelineEvent } from '../../types/content'
import BookmarkButton from './BookmarkButton'

const categoryStyle: Record<string, string> = {
  political: 'bg-ochre/10 border-ochre/30 text-ochre',
  military: 'bg-seal/10 border-seal/30 text-seal',
  economic: 'bg-gold/10 border-gold/30 text-gold',
  cultural: 'bg-jade/10 border-jade/30 text-jade',
  social: 'bg-inkwash/10 border-inkwash/30 text-inkwash',
  diplomatic: 'bg-jade/10 border-jade/30 text-jade',
}

const categoryLabel: Record<string, string> = {
  political: '政治',
  military: '军事',
  economic: '经济',
  cultural: '文化',
  social: '社会',
  diplomatic: '外交',
}

interface Props {
  events: TimelineEvent[]
}

export default function Timeline({ events }: Props) {
  const sorted = [...events].sort((a, b) => a.year - b.year)

  return (
    <div className="relative">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px" />

      <div className="space-y-6">
        {sorted.map((event, i) => {
          const isLeft = i % 2 === 0
          return (
            <div key={event.id} className="relative">
              {/* Dot on center line — uniform size */}
              <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-paper bg-seal z-10" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
                className={`pl-12 md:pl-0 md:w-1/2 ${
                  isLeft ? 'md:pr-10 md:ml-0' : 'md:pl-10 md:ml-auto'
                }`}
              >
                <div className="bg-paper-light border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  {/* Top row: year + category tag + importance badge + bookmark */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`shrink-0 text-xs px-2 py-0.5 rounded border ${categoryStyle[event.category]}`}
                    >
                      {event.year}年
                    </span>
                    <span
                      className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${categoryStyle[event.category]}`}
                    >
                      {categoryLabel[event.category] ?? event.category}
                    </span>
                    {event.importance === 3 && (
                      <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-seal/10 text-seal border border-seal/30 font-medium">
                        重大
                      </span>
                    )}
                    <div className="ml-auto">
                      <BookmarkButton
                        type="event"
                        itemId={event.id}
                        eraId="song"
                        title={event.title}
                      />
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-ink mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-ink-light leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
