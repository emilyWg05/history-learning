import type { Article } from '../../types/content'

export const yuanMilitary: Article[] = [
  {
    id: 'yuan-military-overview',
    title: '元代军事',
    moduleId: 'military',
    eraId: 'yuan',
    summary: '元朝拥有当时世界上最强大的骑兵部队，其军事力量一度横跨欧亚。但入主中原后，军队战斗力逐渐下降。',
    sections: [
      {
        heading: '军事制度',
        paragraphs: [
          '元朝军事制度源于蒙古的万户、千户、百户十进制组织。全国军队分为宿卫军（怯薛，负责皇帝和宫廷安全）和镇戍军（驻防各地）。地方上设都元帅府、万户府统兵。元朝在要害之地屯驻重兵，尤其是江南和西北边防。军队以骑兵为核心，擅长长途奔袭和机动作战。',
        ],
      },
      {
        heading: '主要战争',
        paragraphs: [
          '忽必烈时期元军对外扩张达到顶峰：两次东征日本均因台风失败；对安南（越南）、占城、缅甸的征伐也未能完全征服。元朝后期，军队腐化严重，战斗力大减，面对红巾军和朱元璋等起义军的攻击节节败退，最终被明朝推翻。',
        ],
      },
    ],
    relatedArticles: [],
    relatedFigures: [],
    tags: ['骑兵', '怯薛', '军事制度'],
  },
]
