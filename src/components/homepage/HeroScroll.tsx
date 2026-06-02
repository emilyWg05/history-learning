import { useEffect, useRef, useState } from "react"
import { Pause, Play, Maximize2, Minimize2 } from "lucide-react"

export function HeroScroll() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(true)
  const [scrollPct, setScrollPct] = useState(0)
  const [needsGesture, setNeedsGesture] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoError, setVideoError] = useState(false)

  // Scroll-linked transition
  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduce) return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const h = el.offsetHeight
      const y = Math.min(Math.max(window.scrollY, 0), h)
      setScrollPct(y / h)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Autoplay with gesture fallback
  useEffect(() => {
    const v = videoRef.current
    if (!v || videoError) return
    v.muted = true
    v.setAttribute("muted", "")
    v.setAttribute("playsinline", "")
    v.setAttribute("webkit-playsinline", "")

    const tryPlay = async () => {
      try {
        await v.play()
        setPlaying(true)
        setNeedsGesture(false)
      } catch {
        setPlaying(false)
        setNeedsGesture(true)
      }
    }
    tryPlay()

    const onGesture = () => {
      if (!videoRef.current) return
      videoRef.current.play().then(() => {
        setPlaying(true)
        setNeedsGesture(false)
      }).catch(() => {})
    }
    window.addEventListener("touchstart", onGesture, { once: true, passive: true })
    window.addEventListener("scroll", onGesture, { once: true, passive: true })
    window.addEventListener("click", onGesture, { once: true })
    return () => {
      window.removeEventListener("touchstart", onGesture)
      window.removeEventListener("scroll", onGesture)
      window.removeEventListener("click", onGesture)
    }
  }, [videoError])

  // Pause when offscreen
  useEffect(() => {
    const v = videoRef.current
    const el = sectionRef.current
    if (!v || !el || videoError) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          v.pause()
        } else if (playing && !needsGesture) {
          v.play().catch(() => {})
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [playing, needsGesture, videoError])

  // Track fullscreen
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onFs)
    return () => document.removeEventListener("fullscreenchange", onFs)
  }, [])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => { setPlaying(true); setNeedsGesture(false) }).catch(() => {})
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleFullscreen = async () => {
    const v = videoRef.current
    const el = sectionRef.current
    if (!v || !el) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if (el.requestFullscreen) {
        await el.requestFullscreen()
      } else if ((v as any).webkitEnterFullscreen) {
        (v as any).webkitEnterFullscreen()
      }
    } catch {
      /* noop */
    }
  }

  const scale = 1 + scrollPct * 0.08
  const translateY = scrollPct * 60
  const veilOpacity = 0.55 + scrollPct * 0.4
  const titleOffset = scrollPct * -80
  const titleOpacity = Math.max(1 - scrollPct * 1.6, 0)

  // Video source — use a local video from public/ if available, otherwise show a static bg
  const videoSrc = "/hero-history.mp4"

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${translateY}px, 0) scale(${scale})` }}
      >
        {videoError ? (
          <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-ink via-ink/95 to-ink/70" />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            {...({ "webkit-playsinline": "" } as Record<string, string>)}
            onError={() => setVideoError(true)}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="absolute inset-0 ink-veil pointer-events-none" style={{ opacity: veilOpacity }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 paper-fade pointer-events-none" />

      <div
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-32 sm:pb-28 md:px-16 md:pb-32 max-w-5xl will-change-transform"
        style={{ transform: `translate3d(0, ${titleOffset}px, 0)`, opacity: titleOpacity }}
      >
        <div className="h-px w-24 bg-gold/80 mb-6 md:mb-8 animate-unfurl" />
        <div className="flex flex-row items-start gap-[1em]">
          <p className="vertical-rl font-serif-cn text-paper/80 text-sm tracking-[0.6em] shrink-0 hidden md:block pt-[1em]">
            自三皇五帝　至今日之文明
          </p>
          <div className="flex-1 min-w-0">
            <h1 className="font-serif-cn text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-paper animate-ink-rise">
              以卷为径<br />
              <span className="text-gold">走进文明的来处</span>
            </h1>
            <p className="mt-6 md:mt-8 max-w-xl text-paper/85 text-sm sm:text-base md:text-lg leading-relaxed font-sans-cn animate-ink-rise" style={{ animationDelay: "0.25s" }}>
              史鉴是一部可滚动的文明长卷。东方与西方并行铺展，让每一段往事都有温度、有节奏、有去处。
            </p>
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 animate-ink-rise" style={{ animationDelay: "0.45s" }}>
              <a href="#china" className="bg-cinnabar text-paper px-7 py-3 rounded-sm font-serif-cn tracking-[0.3em] text-sm hover:opacity-90 transition-opacity min-h-11">
                开　卷
              </a>
              <a href="#timeline" className="text-paper/90 font-serif-cn tracking-[0.3em] text-sm border-b border-paper/40 hover:border-paper pb-1 transition-colors">
                览时间轴 →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gesture overlay for mobile */}
      {needsGesture && !videoError && (
        <button
          type="button"
          onClick={toggle}
          aria-label="轻触以播放背景视频"
          className="absolute inset-0 z-20 flex items-center justify-center bg-ink/30 backdrop-blur-[2px] md:hidden"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cinnabar/90 text-paper shadow-lg">
            <Play className="h-8 w-8 ml-1" />
          </span>
        </button>
      )}

      {/* Controls */}
      {!videoError && (
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-4 md:left-auto md:translate-x-0 md:right-6 md:bottom-6 flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "暂停背景视频" : "播放背景视频"}
            aria-pressed={!playing}
            className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full border border-paper/30 bg-ink/50 backdrop-blur-md px-4 py-2.5 text-paper/90 hover:bg-ink/70 hover:text-paper active:scale-95 transition-all"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="font-serif-cn text-xs tracking-[0.3em]">{playing ? "暂停" : "播放"}</span>
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "退出全屏" : "全屏播放"}
            aria-pressed={isFullscreen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 bg-ink/50 backdrop-blur-md text-paper/90 hover:bg-ink/70 hover:text-paper active:scale-95 transition-all"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-paper/60"
        style={{ opacity: Math.max(1 - scrollPct * 3, 0) }}
      >
        <span className="font-serif-cn text-xs tracking-[0.4em]">向下滚动</span>
        <span className="h-10 w-px bg-paper/40 animate-pulse" />
      </div>
    </section>
  )
}
