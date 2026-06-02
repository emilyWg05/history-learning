export function SiteFooter() {
  return (
    <footer className="bg-paper border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-stretch gap-3 mb-4">
            <span className="inline-flex items-center justify-center bg-cinnabar text-paper rounded-sm py-1 px-0.5 text-sm leading-none"
              style={{ fontFamily: 'var(--font-heading)', writingMode: 'vertical-rl', boxShadow: 'inset 0 0 0 2px oklch(0.98 0.008 80 / 0.3)' }}
            >史鉴</span>
            <div className="font-heading tracking-[0.3em] leading-relaxed flex flex-col justify-center">
              <span>WHERE · IT ·</span>
              <span>ALL · BEGAN</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            一部可滚动的人类文明长卷。
          </p>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-4 text-foreground">导览</h4>
          <ul className="grid grid-cols-2 gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
            <li><a href="#china" className="hover:text-foreground">中国史</a></li>
            <li><a href="#world" className="hover:text-foreground">世界史</a></li>
            <li><a href="#timeline" className="hover:text-foreground">时间轴</a></li>
            <li><a href="#ask" className="hover:text-foreground">问古</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-bold mb-4 text-foreground">关于</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            遵循 WCAG 2.1 AA 无障碍标准，尊重 prefers-reduced-motion 偏好。
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 text-xs tracking-[0.2em] text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} 史鉴 WHERE · IT · ALL · BEGAN</span>
          <span className="font-heading">温 · 灵 · 鲜</span>
        </div>
      </div>
    </footer>
  )
}
