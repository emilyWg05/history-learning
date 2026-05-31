import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { eras } from '../data/eras'
import SealStamp from '../components/ui/SealStamp'

const chinaEras = eras.filter((era) => era.category === 'chinese')

const dotColorMap: Record<string, string> = {
  tang: 'dc-ochre',
  wudai: 'dc-wash',
  song: 'dc-jade',
  yuan: 'dc-gold',
  ming: 'dc-seal',
}

const textColorMap: Record<string, string> = {
  tang: 'text-ochre',
  wudai: 'text-inkwash',
  song: 'text-jade',
  yuan: 'text-gold',
  ming: 'text-seal',
}

const bgColorMap: Record<string, string> = {
  tang: 'bg-ochre/5 border-ochre/15 text-ochre',
  wudai: 'bg-inkwash/5 border-inkwash/15 text-inkwash',
  song: 'bg-jade/5 border-jade/15 text-jade',
  yuan: 'bg-gold/5 border-gold/15 text-gold',
  ming: 'bg-seal/5 border-seal/15 text-seal',
}

const taglines: Record<string, string> = {
  tang: '帝国盛世',
  wudai: '群雄并起',
  song: '文治巅峰',
  yuan: '大哉乾元',
  ming: '风华绝代',
}

const dynastyCards: Record<string, { title: string; desc: string }[]> = {
  tang: [
    { title: '贞观之治', desc: '太宗李世民开创' },
    { title: '开元盛世', desc: '玄宗李隆基鼎盛' },
    { title: '唐诗璀璨', desc: '李白杜甫白居易' },
    { title: '丝绸之路', desc: '连接东西方文明' },
  ],
  wudai: [
    { title: '五代更迭', desc: '梁唐晋汉周五十四年' },
    { title: '词学成熟', desc: '花间集与南唐词派' },
    { title: '经济南移', desc: '南方经济超越北方' },
    { title: '门阀终结', desc: '士族政治让位于科举' },
  ],
  song: [
    { title: '经济繁荣', desc: '商品经济高度发展' },
    { title: '科技发明', desc: '活字印刷指南针' },
    { title: '宋词风雅', desc: '苏轼辛弃疾李清照' },
    { title: '文艺复兴', desc: '理学思想与绘画' },
  ],
  yuan: [
    { title: '大都建城', desc: '北京城营建之始' },
    { title: '元曲兴盛', desc: '关汉卿与《窦娥冤》' },
    { title: '马可波罗', desc: '东西方文化交流' },
    { title: '天文成就', desc: '郭守敬与《授时历》' },
  ],
  ming: [
    { title: '驱逐蒙元', desc: '朱元璋恢复中华' },
    { title: '永乐盛世', desc: '朱棣迁都北京' },
    { title: '郑和下西洋', desc: '航海壮举远播国威' },
    { title: '四大名著', desc: '小说创作的巅峰' },
  ],
}

const worldChapters = [
  {
    title: '古典文明',
    years: '前800 - 476',
    places: '希腊城邦 / 罗马共和国 / 波斯帝国 / 孔雀王朝',
  },
  {
    title: '中世纪世界',
    years: '476 - 1453',
    places: '拜占庭 / 伊斯兰黄金时代 / 欧洲封建制 / 十字军东征',
  },
  {
    title: '全球航路',
    years: '1453 - 1789',
    places: '文艺复兴 / 地理大发现 / 奥斯曼帝国 / 大西洋贸易',
  },
  {
    title: '近代革命',
    years: '1789 - 1914',
    places: '启蒙运动 / 工业革命 / 民族国家 / 全球殖民体系',
  },
]


export default function Home() {
  const [activeDynasty, setActiveDynasty] = useState(chinaEras[0]?.id ?? 'tang')
  const [isTouch, setIsTouch] = useState(false)
  const revealRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
    }

    revealRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      if (revealRef.current) revealRef.current.observe(el)
    })

    return () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (revealRef.current) revealRef.current.unobserve(el)
      })
    }
  }, [])

  const handleMouseEnter = useCallback((id: string) => {
    if (isTouch) return
    setActiveDynasty(id)
  }, [isTouch])

  const handleClick = useCallback((id: string) => {
    setIsTouch(true)
    setActiveDynasty(id)
  }, [])

  const handleMouseMove = useCallback(() => {
    setIsTouch(false)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="pb-12"
      onMouseMove={handleMouseMove}
    >
      {/* ====== HERO ====== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center" aria-label="欢迎区域">
        <div className="mb-6 reveal">
          <SealStamp text="鉴" />
        </div>
        <h1 className="font-heading text-5xl sm:text-7xl font-black text-ink mb-4 tracking-widest reveal reveal-delay-1">
          史鉴
        </h1>
        <p className="text-ink-muted text-lg sm:text-2xl max-w-2xl leading-relaxed reveal reveal-delay-2" style={{ textWrap: 'balance' }}>
          以史为鉴，可以知兴替
        </p>
        <p className="text-ink-muted/60 text-sm sm:text-base mt-3 max-w-xl reveal reveal-delay-2" style={{ textWrap: 'balance' }}>
          纵横东西，以时间为轴，以事件为纬，走进人类文明的每一个重要瞬间
        </p>
        <div className="decorative-line w-48 sm:w-64 mx-auto mt-8 reveal reveal-delay-3" />
        <div className="flex flex-col sm:flex-row gap-3 mt-8 reveal reveal-delay-3">
          <a
            href="#china"
            className="px-6 py-2.5 bg-seal text-paper-light rounded-lg text-sm font-medium hover:bg-seal/85 transition-colors focus-ring"
          >
            探索中国史
          </a>
          <a
            href="#world"
            className="px-6 py-2.5 bg-world text-paper-light rounded-lg text-sm font-medium hover:bg-world/85 transition-colors focus-ring"
          >
            探索世界史
          </a>
        </div>
        <div className="scroll-indicator mt-16 text-ink-muted/20" aria-hidden="true">
          <svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs mt-1 block">向下滚动</span>
        </div>
      </section>

      {/* ====== 中国史 — 王朝巡览 ====== */}
      <section id="china" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-6" aria-label="中国史">
        <div className="text-center mb-5 reveal">
          <span className="section-pill bg-seal/8 text-seal border border-seal/15">CHINA · 中国史</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink mt-4 mb-3">帝国与王朝</h2>
          <p className="text-ink-muted max-w-lg mx-auto text-sm">悬停朝代节点即览详情，画卷延展，一朝一页</p>
        </div>

        {/* Dynasty timeline */}
        <div className="scroll-stage reveal">
          <div className="scroll-line">
            <div className="scroll-dots">
              {chinaEras.map((era) => (
                <div
                  key={era.id}
                  className={`scroll-dot ${dotColorMap[era.id] ?? 'dc-ochre'} ${activeDynasty === era.id ? 'active' : ''}`}
                  onMouseEnter={() => handleMouseEnter(era.id)}
                  onClick={() => handleClick(era.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleClick(era.id)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${era.name} ${era.startYear}-${era.endYear}`}
                >
                  <div className="dot-circle">{era.name.charAt(0)}</div>
                  <span className="dot-label">{era.name}</span>
                  <span className="dot-year">{era.startYear}-{era.endYear}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="dynasty-showcase reveal reveal-delay-1">
          {chinaEras.map((era) => (
            <div
              key={era.id}
              id={`pane-${era.id}`}
              className={`dynasty-pane ${activeDynasty === era.id ? 'active' : ''}`}
            >
              <Link to={`/${era.id}`} className="pane-name hover:text-ochre transition-colors">{era.name}</Link>
              <div className="pane-meta">
                <span className={`pane-years ${textColorMap[era.id] ?? 'text-ochre'}`}>
                  {era.startYear} - {era.endYear}
                </span>
                <span>·</span>
                <span>{taglines[era.id] ?? ''}</span>
              </div>
              <div className="pane-tags">
                {era.periods.map((p) => (
                  <span
                    key={p.id}
                    className={`text-xs px-2 py-0.5 rounded border ${bgColorMap[era.id] ?? 'bg-ochre/5 border-ochre/15 text-ochre'}`}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
              <p className="pane-desc">{era.overview}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                {(dynastyCards[era.id] ?? []).map((card) => (
                  <div key={card.title} className="pane-card">
                    <span className={`block font-medium mb-1 ${textColorMap[era.id] ?? 'text-ochre'}`}>{card.title}</span>
                    <span className="text-ink-muted">{card.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-6">
          <p className="text-xs text-ink-muted/30">更多朝代持续收录中 · 画卷徐徐展开</p>
        </div>
      </section>

      {/* Transition */}
      <div className="relative z-10 max-w-xs mx-auto px-4 py-8 reveal">
        <hr className="china-divider w-48 mx-auto" />
      </div>

      {/* ====== 世界史 ====== */}
      <section id="world" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24" aria-label="世界史">
        <div className="text-center mb-20 reveal">
          <span className="section-pill bg-world/8 text-world border border-world/15">WORLD · 世界史</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink mt-4 mb-3">世界文明的脚步</h2>
          <p className="text-ink-muted max-w-lg mx-auto text-sm">从古典到近代，跨越大陆与海洋，追溯全球文明进程中的重要篇章</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {worldChapters.map((chapter, i) => (
            <div key={chapter.title} className="reveal world-card" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3 className="font-heading text-lg font-bold text-ink mb-2">{chapter.title}</h3>
              <p className="text-xs text-ink-muted/70 leading-relaxed mb-1">{chapter.years}</p>
              <p className="text-xs text-ink-muted/70 leading-relaxed mb-4">{chapter.places}</p>
              <span className="inline-block text-xs text-world/50 border border-world/15 rounded-full px-3 py-1">即将开放</span>
            </div>
          ))}
        </div>
        <div className="reveal text-center mt-12">
          <p className="text-xs text-ink-muted/40">更多时代内容持续收录中</p>
        </div>
      </section>

      <hr className="world-divider w-64 mx-auto reveal" />

      {/* ====== MODULE GRID ====== */}
      <section id="modules" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24" aria-label="学习模块">
        <div className="text-center mb-16 reveal">
          <span className="section-pill bg-ochre/8 text-ochre border border-ochre/15">MODULES</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink mt-4 mb-3">十大学习模块</h2>
          <p className="text-ink-muted max-w-md mx-auto text-sm">每个朝代从十个维度切入，建立立体的历史认知</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="reveal reveal-delay-1 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ochre/10 flex items-center justify-center text-ochre"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">君主图鉴</h3><p className="text-xs text-ink-muted/60">历代帝王生平事迹</p></div>
          <div className="reveal reveal-delay-1 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ochre/10 flex items-center justify-center text-ochre"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">大事年表</h3><p className="text-xs text-ink-muted/60">编年史时间线</p></div>
          <div className="reveal reveal-delay-2 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-jade/10 flex items-center justify-center text-jade"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">政治</h3><p className="text-xs text-ink-muted/60">制度与政局变迁</p></div>
          <div className="reveal reveal-delay-2 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gold/10 flex items-center justify-center text-gold"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">经济</h3><p className="text-xs text-ink-muted/60">农业商业与财政</p></div>
          <div className="reveal reveal-delay-3 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-seal/10 flex items-center justify-center text-seal"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">军事</h3><p className="text-xs text-ink-muted/60">战争与国防体系</p></div>
          <div className="reveal reveal-delay-1 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ink-wash/10 flex items-center justify-center text-ink-wash"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">文化</h3><p className="text-xs text-ink-muted/60">文学艺术与思想</p></div>
          <div className="reveal reveal-delay-2 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-jade/10 flex items-center justify-center text-jade"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.14-3.083M5.404 14.846H3.75"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">外交</h3><p className="text-xs text-ink-muted/60">对外关系与交流</p></div>
          <div className="reveal reveal-delay-3 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ochre/10 flex items-center justify-center text-ochre"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">社会</h3><p className="text-xs text-ink-muted/60">阶层与日常生活</p></div>
          <div className="reveal reveal-delay-4 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gold/10 flex items-center justify-center text-gold"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">人物志</h3><p className="text-xs text-ink-muted/60">历史人物列传</p></div>
          <div className="reveal reveal-delay-4 module-card"><div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-seal/10 flex items-center justify-center text-seal"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/></svg></div><h3 className="font-heading text-sm font-semibold text-ink mb-1">民族</h3><p className="text-xs text-ink-muted/60">族群关系与文化融合</p></div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center reveal" aria-label="行动号召">
        <div className="bg-paper-light border border-border rounded-2xl p-8 sm:p-12">
          <div className="mb-4 mx-auto flex justify-center">
            <SealStamp text="史" size="sm" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink mb-3">开始你的历史探索之旅</h2>
          <p className="text-ink-muted max-w-md mx-auto mb-8 text-sm leading-relaxed">
            从唐风宋韵到大航海时代，横跨东西方文明。AI 问答助你解惑，复习清单巩固所学。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#china"
              className="px-8 py-3 bg-seal text-paper-light rounded-lg text-sm font-medium hover:bg-seal/85 transition-colors focus-ring"
            >
              探索中国史
            </a>
            <a
              href="#world"
              className="px-8 py-3 bg-world text-paper-light rounded-lg text-sm font-medium hover:bg-world/85 transition-colors focus-ring"
            >
              探索世界史
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
