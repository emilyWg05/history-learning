import { useState } from 'react'
import FlashCard from '../ui/FlashCard'
import type { Figure } from '../../types/content'

interface Props {
  figures: Figure[]
}

export default function FlashCardDeck({ figures }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const figure = figures[index]
  if (!figure) return null

  const goNext = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % figures.length)
  }
  const goPrev = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + figures.length) % figures.length)
  }

  return (
    <div className="max-w-md mx-auto">
      <FlashCard
        isFlipped={flipped}
        onFlip={() => setFlipped(!flipped)}
        front={
          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold text-ink mb-2">
              {figure.name}
            </h3>
            <p className="text-sm text-ink-light/60">
              {figure.courtesyName && `字${figure.courtesyName}`}
              {figure.pseudonym && ` · 号${figure.pseudonym}`}
            </p>
            <p className="text-sm text-ink-light/50 mt-1">
              {figure.birthYear}—{figure.deathYear}
            </p>
          </div>
        }
        back={
          <div>
            <h3 className="font-heading text-lg font-semibold text-ink mb-2 text-center">
              {figure.name}
            </h3>
            <p className="text-sm text-ink-light leading-relaxed mb-3">
              {figure.biography}
            </p>
            {figure.famousWorks.length > 0 && (
              <div className="mb-2">
                <span className="text-xs text-ink-light/50">代表作：</span>
                {figure.famousWorks.map((w) => (
                  <span key={w} className="text-xs text-jade ml-1">
                    {w}
                  </span>
                ))}
              </div>
            )}
            {figure.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {figure.tags.map((t) => (
                  <span key={t} className="text-xs bg-border/30 text-ink-light/70 px-1.5 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            )}
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
          {index + 1} / {figures.length}
        </span>
        <button
          onClick={goNext}
          className="text-sm text-ink-light hover:text-ink transition-colors"
        >
          下一张 →
        </button>
      </div>
    </div>
  )
}
