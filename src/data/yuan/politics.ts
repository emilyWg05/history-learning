import type { Article } from '../../types/content'

export const yuanPolitics: Article[] = [
  {
    id: 'yuan-political-system',
    title: '元朝政治制度',
    moduleId: 'politics',
    eraId: 'yuan',
    summary: '元朝建立了以中书省为核心、行省为地方支柱的行政体系，同时实行民族等级制度，其政治制度兼具蒙古旧制和中原汉制的双重特征。',
    sections: [
      {
        heading: '中央与地方行政',
        paragraphs: [
          '元朝中央最高行政机关为中书省，设中书令（通常由皇太子兼任）、左右丞相、平章政事等职。枢密院掌军事，御史台司监察。地方上创行省制度，全国设十一行中书省，行省长官为平章政事，统揽一方军政大权。行省之下设路、府、州、县，形成严密的五级行政体系。行省制度是元代最重要的政治创制，为明清所继承。',
        ],
      },
      {
        heading: '四等人制',
        paragraphs: [
          '元朝实行严格的民族等级制度：蒙古人为第一等，享有最高政治特权；色目人（西域各族人）为第二等，多担任财政及商业职务；汉人（原金朝统治下的汉族等）为第三等；南人（原南宋统治下的汉族）为第四等，地位最低。四等人在法律地位、赋税负担、科举名额、官员任用等方面均有差异，这一制度加剧了民族矛盾。',
        ],
      },
    ],
    relatedArticles: [],
    relatedFigures: ['kublai-khan', 'tuo-tuo'],
    tags: ['行省制度', '四等人制', '中央集权'],
  },
]
