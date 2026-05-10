interface Props {
  text: string
  size?: 'sm' | 'md'
}

export default function SealStamp({ text, size = 'md' }: Props) {
  const dims = size === 'sm' ? 32 : 44
  return (
    <svg
      width={dims}
      height={dims}
      viewBox="0 0 44 44"
      className="shrink-0"
      aria-hidden="true"
    >
      <rect
        x="2" y="2" width="40" height="40"
        rx="4"
        fill="none"
        stroke="#c41e3a"
        strokeWidth="2"
      />
      <text
        x="22" y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#c41e3a"
        fontSize="18"
        fontFamily='"Ma Shan Zheng", cursive'
        letterSpacing="2"
      >
        {text.slice(0, 2)}
      </text>
    </svg>
  )
}
