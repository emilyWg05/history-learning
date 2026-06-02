const marks = [
  { year: "前 2070", cn: "夏", world: "古埃及中王国" },
  { year: "前 221", cn: "秦统一", world: "罗马共和扩张" },
  { year: "公元 618", cn: "唐立", world: "伊斯兰兴起" },
  { year: "1206", cn: "蒙元西征", world: "成吉思汗时代" },
  { year: "1492", cn: "明 · 弘治", world: "哥伦布抵美洲" },
  { year: "1840", cn: "鸦片战争", world: "维多利亚时代" },
  { year: "1969", cn: "新中国二十年", world: "阿波罗登月" },
]

export function TimelineRibbon() {
  return (
    <section id="timeline" className="relative py-24 md:py-32 bg-[rgb(240,230,219)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14">
          <span className="text-xs tracking-[0.3em] text-gold font-heading">时间之河</span>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl text-foreground">一条河，两岸事</h2>
          <p className="mt-3 text-ink-muted text-sm leading-relaxed md:whitespace-nowrap">
            把东方的纪年与西方的纪年放在同一条河上，看文明如何彼此回响。
          </p>
        </div>

        <div className="relative overflow-x-auto pb-6">
          <div className="relative min-w-[900px]">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

            <div className="grid grid-cols-7 gap-2 relative">
              {marks.map((m, i) => (
                <div key={m.year} className="flex flex-col items-center">
                  <div className={`mb-4 text-center ${i % 2 === 0 ? "" : "opacity-90"}`}>
                    <p className="text-cinnabar text-base font-body-sans">{m.cn}</p>
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-foreground" />
                    <span className="mt-3 text-xs tracking-[0.2em] text-muted-foreground whitespace-nowrap font-body-sans">{m.year}</span>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-jade text-base font-body-sans">{m.world}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
