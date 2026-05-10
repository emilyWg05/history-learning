import type { Article } from '../../types/content'

export const yuanEconomy: Article[] = [
  {
    id: 'yuan-economy-overview',
    title: '元代经济',
    moduleId: 'economy',
    eraId: 'yuan',
    summary: '元朝统一全国后经济逐步恢复，纸币成为法定货币，海外贸易持续繁荣，棉花种植和纺织业取得重大突破。',
    sections: [
      {
        heading: '纸币与金融',
        paragraphs: [
          '元朝是中国历史上第一个以纸币为主要流通货币的统一王朝。忽必烈发行"中统元宝交钞"和"至元通行宝钞"，在全国强制流通。初期钞法稳定，促进了商品经济发展。但后期滥发宝钞导致恶性通货膨胀，物价飞涨，"钞买钞"成为元末经济崩溃的重要原因之一。',
        ],
      },
      {
        heading: '棉纺织业的革命',
        paragraphs: [
          '元代棉纺织技术取得革命性突破。黄道婆从海南黎族引入先进纺织技术，发明轧棉机、改进纺车和织机，在松江府推广。松江迅速成为全国棉纺织中心，"松江布"远销各地。棉花种植在长江流域大面积推广，棉布逐渐取代麻布成为普通百姓的主要衣料。',
        ],
      },
    ],
    relatedArticles: [],
    relatedFigures: ['huang-daopo'],
    tags: ['纸币', '棉花', '贸易'],
  },
]
