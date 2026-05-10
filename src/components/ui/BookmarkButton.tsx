import { useState, useCallback } from 'react'
import { isBookmarked, addBookmark, removeBookmark } from '../../utils/bookmarkStorage'
import type { Bookmark } from '../../types/bookmark'

interface Props {
  type: Bookmark['type']
  itemId: string
  eraId: string
  title: string
}

export default function BookmarkButton({ type, itemId, eraId, title }: Props) {
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(itemId, type))

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (bookmarked) {
      removeBookmark(itemId, type)
    } else {
      addBookmark({
        id: `${type}-${itemId}`,
        type,
        itemId,
        eraId,
        title,
        savedAt: Date.now(),
      })
    }
    setBookmarked(!bookmarked)
  }, [bookmarked, type, itemId, eraId, title])

  return (
    <button
      onClick={toggle}
      className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
        bookmarked
          ? 'bg-seal/10 text-seal'
          : 'text-border hover:text-seal hover:bg-seal/5'
      }`}
      title={bookmarked ? '取消收藏' : '加入复习清单'}
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M3 2h10l-1 12-4-3-4 3-1-12z" />
      </svg>
    </button>
  )
}
