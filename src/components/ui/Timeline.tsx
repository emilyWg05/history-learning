import type { TimelineEvent } from '../../types/content'
import type { Period } from '../../types/era'
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

const lineBg: Record<string, string> = {
  tang: 'bg-ochre/20',
  wudai: 'bg-inkwash/20',
  song: 'bg-jade/20',
  yuan: 'bg-gold/20',
  ming: 'bg-seal/20',
}

const dotBg: Record<string, string> = {
  tang: 'bg-ochre',
  wudai: 'bg-inkwash',
  song: 'bg-jade',
  yuan: 'bg-gold',
  ming: 'bg-seal',
}

const periodText: Record<string, string> = {
  tang: 'text-ochre',
  wudai: 'text-inkwash',
  song: 'text-jade',
  yuan: 'text-gold',
  ming: 'text-seal',
}

const dividerGradient: Record<string, string> = {
  tang: 'bg-gradient-to-r from-transparent via-ochre/25 to-transparent',
  wudai: 'bg-gradient-to-r from-transparent via-inkwash/25 to-transparent',
  song: 'bg-gradient-to-r from-transparent via-jade/25 to-transparent',
  yuan: 'bg-gradient-to-r from-transparent via-gold/25 to-transparent',
  ming: 'bg-gradient-to-r from-transparent via-seal/25 to-transparent',
}

interface Props {
  events: TimelineEvent[]
  eraId: string
  periods: Period[]
}

function EventCard({ event, eraId, position }: { event: TimelineEvent; eraId: string; position: 'left' | 'right' }) {
  return (
    <div
      className={`pl-14 md:pl-0 md:w-1/2 ${
        position === 'left' ? 'md:pr-8 md:mr-auto' : 'md:pl-8 md:ml-auto'
      }`}
    >
      <div className="bg-paper-light border border-border/60 rounded-lg p-4 hover:border-border transition-colors">
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className={`shrink-0 text-xs px-2 py-0.5 rounded border font-medium ${categoryStyle[event.category]}`}>
            {event.year}年
          </span>
          <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded border ${categoryStyle[event.category]}`}>
            {categoryLabel[event.category] ?? event.category}
          </span>
          {event.importance === 3 && (
            <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-seal/10 text-seal border border-seal/30 font-medium">
              重大
            </span>
          )}
          <div className="ml-auto">
            <BookmarkButton type="event" itemId={event.id} eraId={eraId} title={event.title} />
          </div>
        </div>
        <h4 className="font-heading font-semibold text-ink mb-1.5">{event.title}</h4>
        <p className="text-sm text-ink-muted leading-relaxed font-body-sans">{event.description}</p>
      </div>
    </div>
  )
}

export default function Timeline({ events, eraId, periods }: Props) {
  const colorKey = (['tang', 'wudai', 'song', 'yuan', 'ming'].includes(eraId) ? eraId : 'tang') as keyof typeof lineBg
  const sorted = [...events].sort((a, b) => a.year - b.year)

  const grouped: { period: Period; events: TimelineEvent[] }[] = []
  for (const period of periods) {
    const periodEvents = sorted.filter((e) => e.periodId === period.id)
    if (periodEvents.length > 0) {
      grouped.push({ period, events: periodEvents })
    }
  }
  const ungrouped = sorted.filter((e) => !periods.some((p) => p.id === e.periodId))

  return (
    <div>
      {grouped.map(({ period, events: periodEvents }) => (
        <div key={period.id}>
          {/* Period header — no vertical line passing through */}
          <div className="flex items-center gap-3 py-6 reveal">
            <div className={`flex-1 h-px ${dividerGradient[colorKey]}`} />
            <h3 className={`font-heading text-lg sm:text-xl font-bold ${periodText[colorKey]} shrink-0`}>
              {period.name}
            </h3>
            <span className="text-xs text-ink-muted/50 shrink-0 font-body-sans">
              {period.startYear} – {period.endYear}
            </span>
            <div className={`flex-1 h-px ${dividerGradient[colorKey]}`} />
          </div>

          {/* Event section with its own center line */}
          <div className="relative">
            <div className={`absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px ${lineBg[colorKey]}`} />
            <div className="space-y-5">
              {periodEvents.map((event, i) => (
                <div key={event.id} className="relative reveal">
                  <div className={`absolute left-5 md:left-1/2 top-6 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-paper ${dotBg[colorKey]} z-10 shadow-sm`} />
                  <EventCard event={event} eraId={eraId} position={i % 2 === 0 ? 'left' : 'right'} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {ungrouped.length > 0 && (
        <div className="relative">
          <div className={`absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px ${lineBg[colorKey]}`} />
          <div className="space-y-5">
            {ungrouped.map((event, i) => (
              <div key={event.id} className="relative reveal">
                <div className={`absolute left-5 md:left-1/2 top-6 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-paper ${dotBg[colorKey]} z-10 shadow-sm`} />
                <EventCard event={event} eraId={eraId} position={i % 2 === 0 ? 'left' : 'right'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
