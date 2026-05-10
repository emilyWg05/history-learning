import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: Props) {
  return (
    <div
      className={`bg-paper-light border border-border rounded-lg p-5 ${
        hover ? 'hover:border-ochre/30 hover:shadow-md transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
