import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getBookmarks, removeBookmark } from '../utils/bookmarkStorage'
import { lookupEmperor, lookupFigure, lookupEvent, lookupArticle } from '../utils/contentLookup'
import FlashCard from '../components/ui/FlashCard'
import type { Bookmark } from '../types/bookmark'

const typeLabel: Record<Bookmark['type'], string> = {
  emperor: '皇帝',
  figure: '人物',
  event: '事件',
  article: '文章',
}

type ViewMode = 'list' | 'cards'

export default function Review() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const sorted = useMemo(
    () => [...bookmarks].sort((a, b) => b.savedAt - a.savedAt),
    [bookmarks],
  )

  const handleRemove = (itemId: string, type: Bookmark['type']) => {
    const updated = removeBookmark(itemId, type)
    setBookmarks(updated)
    if (cardIndex >= updated.length && updated.length > 0) {
      setCardIndex(0)
      setFlipped(false)
    }
  }

  // ---- card mode navigation ----
  const currentBookmark = sorted[cardIndex]
  const goNext = () => {
    setFlipped(false)
    setCardIndex((i) => (i + 1) % sorted.length)
  }
  const goPrev = () => {
    setFlipped(false)
    setCardIndex((i) => (i - 1 + sorted.length) % sorted.length)
  }

  // ---- render content for a bookmark ----
  const renderBookmarkContent = (b: Bookmark) => {
    switch (b.type) {
      case 'emperor': {
        const e = lookupEmperor(b.itemId)
        if (!e) return <p className="text-xs text-ink-light/50">内容已失效</p>
        return (
          <div>
            <p className="text-xs text-ink-light/60 mb-2">
              庙号：{e.templeName} &nbsp; 在位：{e.reignStart}—{e.reignEnd}年 &nbsp; 年号：{e.reignTitle}
            </p>
            <p className="text-sm text-ink-light leading-relaxed mb-2">{e.biography}</p>
            {e.achievements.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {e.achievements.map((a) => (
                  <span key={a} className="text-xs bg-gold/10 text-gold px-1.5 py-0.5 rounded">{a}</span>
                ))}
              </div>
            )}
            {e.majorEvents.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {e.majorEvents.map((ev) => (
                  <span key={ev} className="text-xs bg-seal/5 text-ink-light/70 px-1.5 py-0.5 rounded">{ev}</span>
                ))}
              </div>
            )}
          </div>
        )
      }
      case 'figure': {
        const f = lookupFigure(b.itemId)
        if (!f) return <p className="text-xs text-ink-light/50">内容已失效</p>
        return (
          <div>
            <p className="text-xs text-ink-light/60 mb-2">
              {f.courtesyName && `字${f.courtesyName}`}
              {f.pseudonym && ` · 号${f.pseudonym}`}
              &nbsp; {f.birthYear}—{f.deathYear}
            </p>
            <p className="text-sm text-ink-light leading-relaxed mb-2">{f.biography}</p>
            {f.famousWorks.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {f.famousWorks.map((w) => (
                  <span key={w} className="text-xs bg-jade/10 text-jade px-1.5 py-0.5 rounded">{w}</span>
                ))}
              </div>
            )}
            {f.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {f.tags.map((t) => (
                  <span key={t} className="text-xs bg-border/30 text-ink-light/70 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
            )}
          </div>
        )
      }
      case 'event': {
        const ev = lookupEvent(b.itemId)
        if (!ev) return <p className="text-xs text-ink-light/50">内容已失效</p>
        return (
          <div>
            <p className="text-xs text-ink-light/60 mb-2">{ev.year}年</p>
            <p className="text-sm text-ink-light leading-relaxed">{ev.description}</p>
          </div>
        )
      }
      case 'article': {
        const a = lookupArticle(b.itemId)
        if (!a) return <p className="text-xs text-ink-light/50">内容已失效</p>
        return (
          <div>
            <p className="text-sm text-ink-light/60 mb-2">{a.summary}</p>
            {a.sections.map((s, i) => (
              <div key={i} className="mb-2 last:mb-0">
                <h4 className="text-xs font-medium text-ink mb-0.5">{s.heading}</h4>
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="text-sm text-ink-light leading-relaxed mb-1 last:mb-0">{p}</p>
                ))}
              </div>
            ))}
            {a.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {a.tags.map((t) => (
                  <span key={t} className="text-xs bg-border/30 text-ink-light/70 px-1.5 py-0.5 rounded">{t}</span>
                ))}
              </div>
            )}
          </div>
        )
      }
    }
  }

  // ---- empty state ----
  if (sorted.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="py-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-heading text-3xl font-bold text-ink">复习清单</h1>
          <div className="decorative-line flex-1" />
        </div>
        <div className="text-center py-16">
          <svg className="w-16 h-16 mx-auto mb-4 text-border" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 8h40l-4 48-16-12-16 12-4-48z" />
          </svg>
          <p className="text-ink-light text-lg mb-2">暂无收藏内容</p>
          <p className="text-ink-light/50 text-sm mb-6">
            在各个页面点击书签图标，将感兴趣的内容加入复习清单
          </p>
          <Link
            to="/song"
            className="inline-block bg-ochre/10 text-ochre px-4 py-2 rounded-lg hover:bg-ochre/20 transition-colors text-sm"
          >
            开始浏览宋朝 →
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-8"
    >
      <div className="flex items-center justify-between gap-3 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-heading text-3xl font-bold text-ink">复习清单</h1>
          <span className="text-sm text-ink-light/50">共 {sorted.length} 项</span>
          <div className="decorative-line flex-1 hidden sm:block" />
        </div>
        {/* View toggle */}
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
            onClick={() => { setViewMode('cards'); setCardIndex(0); setFlipped(false) }}
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

      {/* ===== LIST VIEW ===== */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {sorted.map((b) => (
            <div
              key={b.id}
              className="bg-paper-light border border-border rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-ochre/10 text-ochre px-2 py-0.5 rounded shrink-0">
                    {typeLabel[b.type]}
                  </span>
                  <h3 className="font-heading font-semibold text-ink">{b.title}</h3>
                </div>
                <button
                  onClick={() => handleRemove(b.itemId, b.type)}
                  className="text-ink-light/40 hover:text-seal transition-colors text-sm shrink-0"
                >
                  移除
                </button>
              </div>
              {renderBookmarkContent(b)}
            </div>
          ))}
        </div>
      )}

      {/* ===== CARD VIEW ===== */}
      {viewMode === 'cards' && currentBookmark && (
        <div className="max-w-md mx-auto">
          <FlashCard
            isFlipped={flipped}
            onFlip={() => setFlipped(!flipped)}
            front={
              <div className="text-center">
                <span className="inline-block text-xs bg-ochre/10 text-ochre px-2 py-0.5 rounded mb-3">
                  {typeLabel[currentBookmark.type]}
                </span>
                <h3 className="font-heading text-2xl font-bold text-ink mb-2">
                  {currentBookmark.title}
                </h3>
              </div>
            }
            back={
              <div>
                <div className="text-center mb-3">
                  <span className="inline-block text-xs bg-ochre/10 text-ochre px-2 py-0.5 rounded mb-1">
                    {typeLabel[currentBookmark.type]}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {currentBookmark.title}
                  </h3>
                </div>
                {renderBookmarkContent(currentBookmark)}
              </div>
            }
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={goPrev}
              className="text-sm text-ink-light hover:text-ink transition-colors"
            >
              ← 上一张
            </button>
            <span className="text-xs text-ink-light/50">
              {cardIndex + 1} / {sorted.length}
            </span>
            <button
              onClick={goNext}
              className="text-sm text-ink-light hover:text-ink transition-colors"
            >
              下一张 →
            </button>
          </div>

          {/* Remove current */}
          <div className="text-center mt-3">
            <button
              onClick={() => handleRemove(currentBookmark.itemId, currentBookmark.type)}
              className="text-xs text-ink-light/40 hover:text-seal transition-colors"
            >
              从清单中移除此项
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
