import type { Article } from '../../types/content'

export const yuanSociety: Article[] = [
  {
    id: 'yuan-society-overview',
    title: '元代社会',
    moduleId: 'society',
    eraId: 'yuan',
    summary: '元代社会呈现出民族多元、文化交融的特征，城市生活丰富多彩，市民文化繁荣。',
    sections: [
      {
        heading: '多民族社会',
        paragraphs: [
          '元代是中国历史上民族构成最为多元的时期之一。大都（北京）城中居住着蒙古人、汉人、色目人（包括波斯人、阿拉伯人、畏兀儿人等），基督教（也里可温教）、伊斯兰教、佛教、道教在此汇聚。多民族共处带来了语言、饮食、服饰等方面的交流融合，形成了独特的元代社会风貌。',
        ],
      },
      {
        heading: '城市生活',
        paragraphs: [
          '元代城市商业繁荣，大都和杭州是世界级大都市。大都"城方六十里"，内有各种市场，来自欧亚各地的商人云集。杭州虽经宋元易代，依然繁华，"城宽地阔，人烟稠密"。勾栏瓦舍中杂剧演出常年不断，说唱艺术高度发达，市民文化空前活跃。',
        ],
      },
    ],
    relatedArticles: [],
    relatedFigures: ['guan-hanqing'],
    tags: ['多民族', '城市生活', '杂剧'],
  },
]
