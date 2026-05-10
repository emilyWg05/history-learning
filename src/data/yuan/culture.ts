import type { Article } from '../../types/content'

export const yuanCulture: Article[] = [
  {
    id: 'yuan-drama',
    title: '元曲：一代之文学',
    moduleId: 'culture',
    eraId: 'yuan',
    summary: '元曲（杂剧与散曲）是元代文学的最高成就，与唐诗、宋词并称。关汉卿、王实甫、马致远、白朴等剧作家创作了大量杰作。',
    sections: [
      {
        heading: '杂剧的兴盛',
        paragraphs: [
          '元代杂剧是中国古代戏剧成熟的标志。元杂剧一般为四折一楔子，曲词优美，情节生动。由于元代前期科举长期中断，大量文人投身杂剧创作，促进了这一艺术形式的繁荣。代表作品有关汉卿的《窦娥冤》、王实甫的《西厢记》、马致远的《汉宫秋》、白朴的《梧桐雨》等。',
        ],
      },
      {
        heading: '书画艺术',
        paragraphs: [
          '赵孟頫是元代书画的领袖人物，其书法创"赵体"，为楷书四大家之一。绘画上提倡"复古"，回归晋唐传统，以书法入画，开创了元代文人画的新格局。"元四家"（黄公望、吴镇、倪瓒、王蒙）将山水画推向新的高峰，黄公望的《富春山居图》为中国山水画巅峰之作。',
        ],
      },
    ],
    relatedArticles: [],
    relatedFigures: ['guan-hanqing', 'wang-shifu', 'ma-zhiyuan', 'zhao-mengfu'],
    tags: ['元曲', '杂剧', '文人画'],
  },
]
