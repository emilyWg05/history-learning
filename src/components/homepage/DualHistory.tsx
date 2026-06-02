import { useState, useCallback, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { eras } from "../../data/eras"

const chinaEras = eras.filter((era) => era.category === "chinese")

const dotColorMap: Record<string, string> = {
  tang: "dc-ochre",
  wudai: "dc-wash",
  song: "dc-jade",
  yuan: "dc-gold",
  ming: "dc-seal",
}

const textColorMap: Record<string, string> = {
  tang: "text-ochre",
  wudai: "text-inkwash",
  song: "text-jade",
  yuan: "text-gold",
  ming: "text-seal",
}

const bgColorMap: Record<string, string> = {
  tang: "bg-ochre/5 border-ochre/15 text-ochre",
  wudai: "bg-inkwash/5 border-inkwash/15 text-inkwash",
  song: "bg-jade/5 border-jade/15 text-jade",
  yuan: "bg-gold/5 border-gold/15 text-gold",
  ming: "bg-seal/5 border-seal/15 text-seal",
}

const taglines: Record<string, string> = {
  tang: "帝国盛世",
  wudai: "群雄并起",
  song: "文治巅峰",
  yuan: "大哉乾元",
  ming: "风华绝代",
}

const dynastyCards: Record<string, { title: string; desc: string }[]> = {
  tang: [
    { title: "贞观之治", desc: "太宗李世民开创" },
    { title: "开元盛世", desc: "玄宗李隆基鼎盛" },
    { title: "唐诗璀璨", desc: "李白杜甫白居易" },
    { title: "丝绸之路", desc: "连接东西方文明" },
  ],
  wudai: [
    { title: "五代更迭", desc: "梁唐晋汉周五十四年" },
    { title: "词学成熟", desc: "花间集与南唐词派" },
    { title: "经济南移", desc: "南方经济超越北方" },
    { title: "门阀终结", desc: "士族政治让位于科举" },
  ],
  song: [
    { title: "经济繁荣", desc: "商品经济高度发展" },
    { title: "科技发明", desc: "活字印刷指南针" },
    { title: "宋词风雅", desc: "苏轼辛弃疾李清照" },
    { title: "文艺复兴", desc: "理学思想与绘画" },
  ],
  yuan: [
    { title: "大都建城", desc: "北京城营建之始" },
    { title: "元曲兴盛", desc: "关汉卿与《窦娥冤》" },
    { title: "马可波罗", desc: "东西方文化交流" },
    { title: "天文成就", desc: "郭守敬与《授时历》" },
  ],
  ming: [
    { title: "驱逐蒙元", desc: "朱元璋恢复中华" },
    { title: "永乐盛世", desc: "朱棣迁都北京" },
    { title: "郑和下西洋", desc: "航海壮举远播国威" },
    { title: "四大名著", desc: "小说创作的巅峰" },
  ],
}

const worldChapters = [
  {
    title: "古典文明",
    years: "前800 - 476",
    places: "希腊城邦 / 罗马共和国 / 波斯帝国 / 孔雀王朝",
  },
  {
    title: "中世纪世界",
    years: "476 - 1453",
    places: "拜占庭 / 伊斯兰黄金时代 / 欧洲封建制 / 十字军东征",
  },
  {
    title: "全球航路",
    years: "1453 - 1789",
    places: "文艺复兴 / 地理大发现 / 奥斯曼帝国 / 大西洋贸易",
  },
  {
    title: "近代革命",
    years: "1789 - 1914",
    places: "启蒙运动 / 工业革命 / 民族国家 / 全球殖民体系",
  },
]

export function DualHistory() {
  const [activeDynasty, setActiveDynasty] = useState(chinaEras[0]?.id ?? "tang")
  const [isTouch, setIsTouch] = useState(false)
  const revealRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"))
    }
    revealRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    document.querySelectorAll(".reveal").forEach((el) => {
      if (revealRef.current) revealRef.current.observe(el)
    })
    return () => {
      document.querySelectorAll(".reveal").forEach((el) => {
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
    <section className="relative py-28 md:py-40 bg-paper-texture" onMouseMove={handleMouseMove}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center text-center mb-20">
          <span className="seal text-xs mb-6">横贯东西</span>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">两卷并展</h2>
          <p className="max-w-xl text-muted-foreground leading-relaxed">
            同一时刻，东方与西方各自呼吸。我们并列铺展，让文明在对照中互见。
          </p>
        </div>

        {/* ====== 中国史 ====== */}
        <section id="china" className="scroll-mt-2" aria-label="中国史">
          <div className="text-center mb-3 reveal">
            <span className="section-pill bg-seal/8 text-seal border border-seal/15">CHINA · 中国史</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ink mt-4 mb-3">帝国与王朝</h2>
            <p className="text-ink-muted max-w-lg mx-auto text-sm">悬停朝代节点即览详情，画卷延展，一朝一页</p>
          </div>

          {/* Dynasty timeline dots */}
          <div className="scroll-stage reveal">
            <div className="scroll-line">
              {chinaEras.map((era) => (
                <div
                  key={era.id}
                  className={`scroll-dot ${dotColorMap[era.id] ?? "dc-ochre"} ${activeDynasty === era.id ? "active" : ""}`}
                  onMouseEnter={() => handleMouseEnter(era.id)}
                  onClick={() => handleClick(era.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
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

          {/* Detail panel */}
          <div className="dynasty-showcase reveal reveal-delay-1">
            {chinaEras.map((era) => (
              <div
                key={era.id}
                id={`pane-${era.id}`}
                className={`dynasty-pane ${activeDynasty === era.id ? "active" : ""}`}
              >
                <Link to={`/${era.id}`} className="pane-name hover:text-ochre transition-colors">{era.name}</Link>
                <div className="pane-meta">
                  <span className={`pane-years ${textColorMap[era.id] ?? "text-ochre"}`}>
                    {era.startYear} - {era.endYear}
                  </span>
                  <span>·</span>
                  <span>{taglines[era.id] ?? ""}</span>
                </div>
                <div className="pane-tags">
                  {era.periods.map((p) => (
                    <span
                      key={p.id}
                      className={`text-xs px-2 py-0.5 rounded border ${bgColorMap[era.id] ?? "bg-ochre/5 border-ochre/15 text-ochre"}`}
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
                <p className="pane-desc">{era.overview}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                  {(dynastyCards[era.id] ?? []).map((card) => (
                    <div key={card.title} className="pane-card">
                      <span className={`block font-medium mb-1 ${textColorMap[era.id] ?? "text-ochre"}`}>{card.title}</span>
                      <span className="text-ink-muted">{card.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-4">
            <p className="text-xs text-ink-muted/30">更多朝代持续收录中 · 画卷徐徐展开</p>
          </div>
        </section>

        {/* Transition divider */}
        <div className="py-10 reveal">
          <hr className="china-divider w-48 mx-auto" />
        </div>

        {/* ====== 世界史 ====== */}
        <section id="world" className="scroll-mt-2" aria-label="世界史">
          <div className="text-center mb-16 reveal">
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
      </div>
    </section>
  )
}
