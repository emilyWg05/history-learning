export interface Period {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
}

export type EraCategory = 'chinese' | 'global';

export interface ModuleMeta {
  id: string;
  label: string;
  enabled: boolean;
}

export interface Era {
  id: string;
  name: string;
  category: EraCategory;
  periods: Period[];
  startYear: number;
  endYear: number;
  overview: string;
  modules: ModuleMeta[];
}

export const MODULE_IDS = [
  'emperors', 'politics', 'economy', 'culture',
  'military', 'diplomacy', 'society', 'ethnic-groups',
  'figures', 'timeline',
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export const MODULE_LABELS: Record<ModuleId, string> = {
  'emperors': '君主图鉴',
  'politics': '政治',
  'economy': '经济',
  'culture': '文化',
  'military': '军事',
  'diplomacy': '外交',
  'society': '社会',
  'ethnic-groups': '民族',
  'figures': '人物志',
  'timeline': '大事年表',
};
