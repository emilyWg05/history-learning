export interface Bookmark {
  id: string;
  type: 'emperor' | 'figure' | 'event' | 'article';
  itemId: string;
  eraId: string;
  title: string;
  savedAt: number;
}
