import { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { colors } from '../styles/theme'

interface Source {
  era: string
  title: string
  relevance: number
}

interface QAPair {
  id: number
  question: string
  answer: string
  sources: Source[]
}

const ERA_NAMES: Record<string, string> = {
  tang: '唐', song: '宋', yuan: '元', ming: '明', wudai: '五代十国',
}

export default function QAPage() {
  const [searchParams] = useSearchParams()
  const [qaList, setQaList] = useState<QAPair[]>([])
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const initialQ = useRef(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [qaList, loading])

  const submitQuestion = useCallback(async (q: string) => {
    if (!q || loading) return
    setError('')
    setLoading(true)

    const id = nextId.current++
    setQaList(prev => [...prev, { id, question: q, answer: '', sources: [] }])

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      })
      if (!res.ok) throw new Error(`服务器错误: ${res.status}`)
      const data = await res.json()

      setQaList(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, answer: data.answer, sources: data.sources }
            : item
        )
      )
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setQaList(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, answer: '问答服务未启动，请在项目目录运行 start-dev.cmd 启动后端服务', sources: [] }
              : item
          )
        )
      } else {
        setError(`请求失败: ${msg}`)
        setQaList(prev => prev.filter(item => item.id !== id))
      }
    } finally {
      setLoading(false)
    }
  }, [loading])

  // Handle initial query from URL parameter (e.g., from AskPavilion)
  useEffect(() => {
    const q = searchParams.get('q')
    if (q && !initialQ.current) {
      initialQ.current = true
      submitQuestion(q)
    }
  }, [searchParams, submitQuestion])

  async function handleSubmit() {
    const q = question.trim()
    if (!q || loading) return
    setQuestion('')
    await submitQuestion(q)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-8 px-4"
    >
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold text-ink mb-2 tracking-wider">
          史鉴问答
        </h1>
        <p className="text-ink-light text-sm">
          基于网站内容回答中国历史相关问题 &middot; 覆盖唐、宋、元、明、五代十国
        </p>
        <div className="decorative-line w-48 mx-auto mt-4" />
      </div>

      {/* Q&A list */}
      <div className="space-y-6 mb-6">
        <AnimatePresence>
          {qaList.map(qa => (
            <motion.div
              key={qa.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-paper-light border border-border rounded-lg overflow-hidden"
            >
              {/* Question */}
              <div className="px-5 py-3 bg-ochre/5 border-b border-border/50">
                <span className="text-xs text-ochre font-medium mr-2">问</span>
                <span className="text-ink">{qa.question}</span>
              </div>

              {/* Answer */}
              <div className="px-5 py-4">
                {qa.answer ? (
                  <div>
                    <span className="text-xs text-seal font-medium mr-2">答</span>
                    <span className="text-ink leading-relaxed whitespace-pre-wrap">
                      {qa.answer}
                    </span>

                    {/* Sources */}
                    {qa.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border/30">
                        <span className="text-xs text-ink-light/50">参考来源</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {qa.sources.map((s, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-xs bg-border/20 text-ink-light px-2 py-0.5 rounded"
                            >
                              <span style={{ color: colors.seal }}>
                                {ERA_NAMES[s.era] || s.era}
                              </span>
                              <span>&middot;</span>
                              <span>{s.title}</span>
                              <span className="text-ink-light/30">
                                ({Math.round(s.relevance * 100)}%)
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-ink-light">
                    <span className="inline-block w-4 h-4 border-2 border-ochre/30 border-t-ochre rounded-full animate-spin" />
                    <span className="text-sm">检索中...</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator for new question */}
        {loading && qaList.length === 0 && (
          <div className="text-center py-12 text-ink-light text-sm">
            <span className="inline-block w-5 h-5 border-2 border-ochre/30 border-t-ochre rounded-full animate-spin mb-2" />
            <p>正在检索历史资料...</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-seal/10 border border-seal/20 rounded text-sm text-seal">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-4 bg-paper-light border border-border rounded-lg shadow-lg p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit() }}
            placeholder="想问什么？例如：苏轼是哪个朝代的人"
            disabled={loading}
            className="flex-1 bg-transparent border-none outline-none text-ink placeholder:text-ink-light/30 text-sm py-1"
            style={{ fontFamily: 'inherit' }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !question.trim()}
            className="shrink-0 px-5 py-1.5 bg-ochre text-paper-light text-sm rounded
                       hover:bg-ochre/85 disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors"
            style={{ fontFamily: 'inherit' }}
          >
            提问
          </button>
        </div>
      </div>

      <div ref={bottomRef} />
    </motion.div>
  )
}
