export interface Emperor {
  id: string;
  name: string;
  templeName: string;
  posthumousName: string;
  reignTitle: string;
  periodId: string;
  reignStart: number;
  reignEnd: number;
  portrait: string;
  biography: string;
  majorEvents: string[];
  achievements: string[];
}

export type FigureCategory = 'politics' | 'military' | 'culture' | 'science' | 'art';

export interface Figure {
  id: string;
  name: string;
  courtesyName: string;
  pseudonym?: string;
  category: FigureCategory;
  eraId: string;
  birthYear: number;
  deathYear: number;
  portrait: string;
  biography: string;
  famousWorks: string[];
  relatedEvents: string[];
  tags: string[];
}

export type EventCategory = 'political' | 'military' | 'economic' | 'cultural' | 'social' | 'diplomatic';

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: EventCategory;
  periodId: string;
  relatedFigures: string[];
  importance: 1 | 2 | 3;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  id: string;
  title: string;
  moduleId: string;
  eraId: string;
  periodId?: string;
  summary: string;
  sections: ArticleSection[];
  relatedArticles: string[];
  relatedFigures: string[];
  tags: string[];
}
