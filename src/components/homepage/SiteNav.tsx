import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { eras } from "../../data/eras"

export function SiteNav() {
  const [dynastyOpen, setDynastyOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDynastyOpen(false)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const chineseEras = eras.filter(e => e.category === "chinese")

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href="/" className="flex items-center gap-3 text-paper">
          <span className="seal text-sm">史鉴</span>
          <span className="font-heading text-lg tracking-[0.3em] hidden sm:inline">WHERE · IT · ALL · BEGAN</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-sm font-heading tracking-[0.25em] text-paper/85">
          <li><a href="#china" className="hover:text-paper transition-colors">中国史</a></li>
          <li><a href="#world" className="hover:text-paper transition-colors">世界史</a></li>
          <li><a href="#timeline" className="hover:text-paper transition-colors">时间轴</a></li>
          <li><a href="#ask" className="hover:text-paper transition-colors">问古</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDynastyOpen(o => !o)}
              className="text-sm font-heading tracking-[0.25em] text-paper border border-paper/40 px-4 py-2 rounded-sm hover:bg-paper hover:text-ink transition-colors"
            >
              朝代筛选
            </button>
            {dynastyOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-ink/95 border border-paper/20 rounded-sm shadow-lg z-50 backdrop-blur-md">
                <div className="py-1">
                  <div className="text-xs text-paper/40 px-4 py-1.5 font-heading tracking-[0.2em]">中国历史</div>
                  {chineseEras.map(era => (
                    <Link
                      key={era.id}
                      to={`/${era.id}`}
                      onClick={() => setDynastyOpen(false)}
                      className="block px-4 py-2 text-sm text-paper/80 hover:bg-paper/10 hover:text-paper transition-colors font-heading tracking-[0.15em]"
                    >
                      <span>{era.name}</span>
                      <span className="text-paper/30 text-xs ml-2">
                        {era.startYear}–{era.endYear}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a href="/review" className="text-sm font-heading tracking-[0.25em] text-paper border border-paper/40 px-4 py-2 rounded-sm hover:bg-paper hover:text-ink transition-colors">
            入卷
          </a>
        </div>
      </nav>
    </header>
  )
}
