import type { Era } from '../types/era'

const defaultModules = [
  { id: 'emperors', label: '君主图鉴', enabled: true },
  { id: 'politics', label: '政治', enabled: true },
  { id: 'economy', label: '经济', enabled: true },
  { id: 'culture', label: '文化', enabled: true },
  { id: 'military', label: '军事', enabled: true },
  { id: 'diplomacy', label: '外交', enabled: true },
  { id: 'society', label: '社会', enabled: true },
  { id: 'ethnic-groups', label: '民族', enabled: true },
  { id: 'figures', label: '人物志', enabled: true },
  { id: 'timeline', label: '大事年表', enabled: true },
] as const

export const eras: Era[] = [
  {
    id: 'tang',
    name: '唐朝',
    category: 'chinese',
    periods: [
      { id: 'early-tang', name: '初唐', startYear: 618, endYear: 712 },
      { id: 'high-tang', name: '盛唐', startYear: 712, endYear: 755 },
      { id: 'mid-tang', name: '中唐', startYear: 755, endYear: 820 },
      { id: 'late-tang', name: '晚唐', startYear: 820, endYear: 907 },
    ],
    startYear: 618,
    endYear: 907,
    overview: '唐朝（618年—907年）由李渊建立，是中国历史上最强盛的王朝之一。贞观之治、开元盛世成就辉煌，诗坛群星璀璨，丝绸之路空前繁荣，对东亚乃至世界文明影响深远。',
    modules: [...defaultModules],
  },
  {
    id: 'wudai',
    name: '五代十国',
    category: 'chinese',
    periods: [
      { id: 'wudai-dynasties', name: '五代更迭', startYear: 907, endYear: 960 },
      { id: 'ten-kingdoms', name: '十国割据', startYear: 902, endYear: 979 },
    ],
    startYear: 907,
    endYear: 979,
    overview: '五代十国（907年—979年）是唐末藩镇割据的延续，上承大唐下启赵宋。中原先后经历后梁、后唐、后晋、后汉、后周五个短命王朝；南方和山西地区出现十个割据政权。这是分裂与融合的时代，门阀士族终结，经济重心南移，词文学成熟，为宋代繁荣奠定基础。',
    modules: [...defaultModules],
  },
  {
    id: 'song',
    name: '宋朝',
    category: 'chinese',
    periods: [
      { id: 'northern-song', name: '北宋', startYear: 960, endYear: 1127 },
      { id: 'southern-song', name: '南宋', startYear: 1127, endYear: 1279 },
    ],
    startYear: 960,
    endYear: 1279,
    overview: '宋朝（960年—1279年）是中国历史上承五代十国下启元朝的时代，分为北宋和南宋两个阶段，共历十八帝，享国三百一十九年。宋朝是中国古代历史上经济、文化、科技最繁荣的时代之一。',
    modules: [...defaultModules],
  },
  {
    id: 'yuan',
    name: '元朝',
    category: 'chinese',
    periods: [
      { id: 'early-yuan', name: '大蒙古国时期', startYear: 1206, endYear: 1271 },
      { id: 'yuan-dynasty', name: '元朝', startYear: 1271, endYear: 1368 },
    ],
    startYear: 1271,
    endYear: 1368,
    overview: '元朝（1271年—1368年）由蒙古族忽必烈建立，定都大都（今北京），是中国历史上第一个由少数民族建立的大一统王朝。元朝疆域空前辽阔，中西交流频繁，戏曲、天文学等成就卓著。',
    modules: [...defaultModules],
  },
  {
    id: 'ming',
    name: '明朝',
    category: 'chinese',
    periods: [
      { id: 'early-ming', name: '明初', startYear: 1368, endYear: 1449 },
      { id: 'mid-ming', name: '明中期', startYear: 1449, endYear: 1572 },
      { id: 'late-ming', name: '明末', startYear: 1572, endYear: 1644 },
    ],
    startYear: 1368,
    endYear: 1644,
    overview: '明朝（1368年—1644年）由朱元璋建立，定都南京后迁都北京，是中国历史上最后一个由汉族建立的大一统王朝。明朝商品经济发达，出现资本主义萌芽，郑和七下西洋扬威海外。',
    modules: [...defaultModules],
  },
]
