export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 mt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 text-center">
        <div className="h-px w-32 mx-auto mb-4 bg-gradient-to-r from-transparent via-cinnabar/40 to-transparent" />
        <p className="text-sm text-ink-muted font-heading tracking-[0.15em]">
          以史为鉴，可以知兴替
        </p>
        <p className="text-xs text-ink-muted/50 mt-2 font-heading tracking-[0.2em]">
          历史学习平台 · 内容仅供学习参考
        </p>
      </div>
    </footer>
  )
}
