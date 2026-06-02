import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { SiteNav } from "../components/homepage/SiteNav"
import { HeroScroll } from "../components/homepage/HeroScroll"
import { DualHistory } from "../components/homepage/DualHistory"
import { TimelineRibbon } from "../components/homepage/TimelineRibbon"
import { AskPavilion } from "../components/homepage/AskPavilion"
import { SiteFooter } from "../components/homepage/SiteFooter"

const modules = [
  { icon: "emperors", label: "君主图鉴", desc: "历代帝王生平事迹", color: "text-cinnabar", bg: "bg-cinnabar/10" },
  { icon: "timeline", label: "大事年表", desc: "编年史时间线", color: "text-cinnabar", bg: "bg-cinnabar/10" },
  { icon: "politics", label: "政治", desc: "制度与政局变迁", color: "text-jade", bg: "bg-jade/10" },
  { icon: "economy", label: "经济", desc: "农业商业与财政", color: "text-gold", bg: "bg-gold/10" },
  { icon: "military", label: "军事", desc: "战争与国防体系", color: "text-cinnabar", bg: "bg-cinnabar/10" },
  { icon: "culture", label: "文化", desc: "文学艺术与思想", color: "text-ink", bg: "bg-inkwash/10" },
  { icon: "diplomacy", label: "外交", desc: "对外关系与交流", color: "text-jade", bg: "bg-jade/10" },
  { icon: "society", label: "社会", desc: "阶层与日常生活", color: "text-cinnabar", bg: "bg-cinnabar/10" },
  { icon: "figures", label: "人物志", desc: "历史人物列传", color: "text-gold", bg: "bg-gold/10" },
  { icon: "ethnic", label: "民族", desc: "族群关系与文化融合", color: "text-cinnabar", bg: "bg-cinnabar/10" },
]

function ModuleIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    emperors: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    timeline: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    politics: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />,
    economy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    military: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
    culture: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
    diplomacy: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.14-3.083M5.404 14.846H3.75" />,
    society: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    figures: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />,
    ethnic: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />,
  }
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[icon]}
    </svg>
  )
}

export default function Home() {
  const [showBackTop, setShowBackTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > window.innerHeight)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[rgb(244,240,231)] text-foreground">
      <SiteNav />
      <HeroScroll />
      <DualHistory />
      <TimelineRibbon />

      <AskPavilion />

      {/* ====== 十大学习模块 ====== */}
      <section id="modules" className="relative py-24 md:py-32 bg-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="seal text-xs mb-6">视　角</span>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">十大学习模块</h2>
            <p className="max-w-md text-muted-foreground leading-relaxed">
              每个朝代从十个维度切入，建立立体的历史认知
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {modules.map((mod) => (
              <div
                key={mod.icon}
                className="group bg-card border border-border rounded-sm p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(61,50,38,0.15)] hover:border-cinnabar/20"
              >
                <div className={`w-10 h-10 mx-auto mb-3 rounded-lg ${mod.bg} flex items-center justify-center ${mod.color}`}>
                  <ModuleIcon icon={mod.icon} />
                </div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1">{mod.label}</h3>
                <p className="text-xs text-muted-foreground">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Back to top */}
      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="回到顶部"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-cinnabar text-paper shadow-lg hover:opacity-90 transition-opacity"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </main>
  )
}
