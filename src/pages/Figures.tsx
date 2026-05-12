import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { songFigures } from '../data/song'
import { yuanFigures } from '../data/yuan'
import { mingFigures } from '../data/ming'
import { tangFigures } from '../data/tang'
import { wudaiFigures } from '../data/wudai'
import FigureCard from '../components/ui/FigureCard'
import BookmarkButton from '../components/ui/BookmarkButton'
import FlashCardDeck from '../components/features/FlashCardDeck'
import type { Figure, FigureCategory } from '../types/content'

const eraFigures: Record<string, Figure[]> = {
  song: songFigures,
  yuan: yuanFigures,
  ming: mingFigures,
  tang: tangFigures,
  wudai: wudaiFigures,
}

const categories: { value: FigureCategory | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'politics', label: '政治' },
  { value: 'military', label: '军事' },
  { value: 'culture', label: '文化' },
  { value: 'science', label: '科技' },
  { value: 'art', label: '艺术' },
]

type ViewMode = 'list' | 'cards'

export default function Figures() {
  const { eraId } = useParams()
  const [filter, setFilter] = useState<FigureCategory | 'all'>('all')
  const [selected, setSelected] = useState<Figure | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const figures = eraId
    ? [...(eraFigures[eraId] ?? [])].sort((a, b) => a.birthYear - b.birthYear)
    : []
  const filtered =
    filter === 'all' ? figures : figures.filter((f) => f.category === filter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold text-ink">人物志</h1>
          <div className="decorative-line flex-1 hidden sm:block" />
        </div>
        <div className="flex items-center bg-border/20 rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-paper-light text-ink shadow-sm'
                : 'text-ink-light/60 hover:text-ink'
            }`}
          >
            列表
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              viewMode === 'cards'
                ? 'bg-paper-light text-ink shadow-sm'
                : 'text-ink-light/60 hover:text-ink'
            }`}
          >
            知识卡片
          </button>
        </div>
      </div>

      <div className="flex gap-1.5 mb-6 overflow-x-auto scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`shrink-0 px-3 py-1.5 text-sm rounded transition-colors ${
              filter === c.value
                ? 'bg-ochre/10 text-ochre font-medium'
                : 'text-ink-light hover:text-ink hover:bg-border/30'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <FigureCard key={f.id} figure={f} onClick={() => setSelected(f)} />
          ))}
        </div>
      ) : (
        <FlashCardDeck figures={filtered} />
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-paper-light border border-border rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-ink">
                    {selected.name}
                  </h2>
                  <p className="text-sm text-ink-light/60">
                    {selected.courtesyName && `字${selected.courtesyName}`}
                    {selected.pseudonym && ` · 号${selected.pseudonym}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkButton
                    type="figure"
                    itemId={selected.id}
                    eraId={selected.eraId}
                    title={selected.name}
                  />
                  <button
                    onClick={() => setSelected(null)}
                    className="text-ink-light hover:text-ink transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <p className="text-xs text-ink-light/60 mb-4">
                {selected.birthYear}年—{selected.deathYear}年
              </p>

              <p className="text-sm text-ink-light leading-relaxed mb-4">
                {selected.biography}
              </p>

              {selected.famousWorks.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-ink mb-1">代表作品</h4>
                  <div className="flex flex-wrap gap-1">
                    {selected.famousWorks.map((w) => (
                      <span
                        key={w}
                        className="text-xs bg-jade/10 text-jade px-2 py-0.5 rounded"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-border/30 text-ink-light/70 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
