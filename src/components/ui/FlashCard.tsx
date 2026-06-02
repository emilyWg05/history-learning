import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  front: ReactNode
  back: ReactNode
  isFlipped: boolean
  onFlip: () => void
}

export default function FlashCard({ front, back, isFlipped, onFlip }: Props) {
  return (
    <div
      className="cursor-pointer perspective-[1000px]"
      onClick={onFlip}
      style={{ minHeight: '200px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', minHeight: '200px' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-card border border-border/60 rounded-sm p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
          <p className="text-xs text-ink-muted/40 mt-4 font-body-sans">点击翻转查看详情</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-card border border-cinnabar/20 rounded-sm p-6 overflow-y-auto"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
          <p className="text-xs text-ink-muted/40 mt-4 text-center font-body-sans">点击翻转回到正面</p>
        </div>
      </motion.div>
    </div>
  )
}
