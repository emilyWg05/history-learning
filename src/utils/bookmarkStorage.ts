import type { Bookmark } from '../types/bookmark'

const STORAGE_KEY = 'shijian-bookmarks'

export function getBookmarks(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Bookmark[]
  } catch {
    return []
  }
}

export function saveBookmarks(bookmarks: Bookmark[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
}

export function addBookmark(bookmark: Bookmark): Bookmark[] {
  const bookmarks = getBookmarks()
  if (bookmarks.some(b => b.itemId === bookmark.itemId && b.type === bookmark.type)) {
    return bookmarks
  }
  const updated = [...bookmarks, bookmark]
  saveBookmarks(updated)
  return updated
}

export function removeBookmark(itemId: string, type: Bookmark['type']): Bookmark[] {
  const updated = getBookmarks().filter(b => !(b.itemId === itemId && b.type === type))
  saveBookmarks(updated)
  return updated
}

export function isBookmarked(itemId: string, type: Bookmark['type']): boolean {
  return getBookmarks().some(b => b.itemId === itemId && b.type === type)
}
