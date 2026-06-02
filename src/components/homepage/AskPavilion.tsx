import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function AskPavilion() {
  const [question, setQuestion] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = question.trim()
    if (!q) return
    navigate(`/qa?q=${encodeURIComponent(q)}`)
  }

  return (
    <section id="ask" className="relative py-28 md:py-36 bg-ink text-paper overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_30%,_oklch(0.7_0.11_75)_0,_transparent_50%),radial-gradient(circle_at_80%_70%,_oklch(0.52_0.16_35)_0,_transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl px-6 md:px-10 text-center">
        <span className="seal text-xs mb-8 inline-flex">问　古</span>
        <h2 className="font-heading text-4xl md:text-6xl leading-tight mb-6">
          与古人对坐<br/>
          <span className="text-gold">问一问那时的事</span>
        </h2>
        <p className="text-paper/75 max-w-xl mx-auto leading-relaxed mb-10">
          AI 化身史家、诗人、市井，回答你对每一个朝代、每一场战役、每一首诗的好奇。
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl items-center gap-2 bg-paper/10 border border-paper/20 rounded-sm p-2 backdrop-blur-sm">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：唐人如何过中秋？"
            className="flex-1 bg-transparent px-4 py-3 text-paper placeholder:text-paper/50 outline-none font-heading"
          />
          <button type="submit" className="bg-cinnabar text-paper px-6 py-3 rounded-sm font-heading tracking-[0.3em] text-sm hover:opacity-90 transition-opacity">
            问
          </button>
        </form>
      </div>
    </section>
  )
}
