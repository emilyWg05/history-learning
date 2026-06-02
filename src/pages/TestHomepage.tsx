import { SiteNav } from "../components/homepage/SiteNav"
import { HeroScroll } from "../components/homepage/HeroScroll"
import { DualHistory } from "../components/homepage/DualHistory"
import { TimelineRibbon } from "../components/homepage/TimelineRibbon"
import { AskPavilion } from "../components/homepage/AskPavilion"
import { SiteFooter } from "../components/homepage/SiteFooter"

export default function TestHomepage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Banner */}
      <div className="fixed top-16 right-4 z-50 bg-cinnabar text-paper px-4 py-2 rounded-sm text-xs font-sans-cn shadow-lg">
        测试页面 — 确认无误后再关联其它内容
      </div>

      <SiteNav />
      <HeroScroll />
      <DualHistory />
      <TimelineRibbon />

      {/* 十大学习模块 */}
      <section id="modules" className="relative py-24 md:py-32 bg-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="seal text-xs mb-6">学　习</span>
            <h2 className="font-serif-cn text-4xl md:text-5xl text-foreground mb-4">十大学习模块</h2>
            <p className="max-w-md text-muted-foreground leading-relaxed">
              每个朝代从十个维度切入，建立立体的历史认知
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {[
              "君主图鉴", "大事年表", "政治", "经济", "军事",
              "文化", "外交", "社会", "人物志", "民族"
            ].map((label, i) => (
              <div key={label} className="group bg-card border border-border rounded-sm p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-cinnabar/10 flex items-center justify-center text-cinnabar">
                  <span className="font-serif-cn text-sm font-bold">{i + 1}</span>
                </div>
                <h3 className="font-serif-cn text-sm font-semibold text-foreground mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground">模块 {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AskPavilion />
      <SiteFooter />
    </main>
  )
}
