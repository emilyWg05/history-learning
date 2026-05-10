export default function ScrollBorder() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Top-left: distant mountains + clouds */}
      <svg
        className="absolute top-0 left-0 w-80 h-80 opacity-[0.12]"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 160 Q40 80 120 100 Q160 40 220 80 Q280 30 320 90 L320 0 L0 0 Z"
          fill="#9b8c7c"
          opacity="0.5"
        />
        <path
          d="M0 180 Q60 120 140 140 Q200 80 280 120 Q320 90 320 140 L320 0 L0 0 Z"
          fill="#8b7d6b"
          opacity="0.3"
        />
        <ellipse cx="80" cy="60" rx="60" ry="20" fill="#9b8c7c" opacity="0.2" />
        <ellipse cx="200" cy="40" rx="80" ry="15" fill="#8b7d6b" opacity="0.15" />
      </svg>

      {/* Top-right: city wall silhouette */}
      <svg
        className="absolute top-0 right-0 w-72 h-72 opacity-[0.12]"
        viewBox="0 0 288 288"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="80" width="30" height="60" fill="#9b8c7c" opacity="0.6" />
        <rect x="55" y="50" width="25" height="90" fill="#8b7d6b" opacity="0.5" />
        <rect x="85" y="70" width="30" height="70" fill="#9b8c7c" opacity="0.6" />
        <rect x="120" y="90" width="28" height="50" fill="#8b7d6b" opacity="0.4" />
        <rect x="0" y="100" width="288" height="12" fill="#9b8c7c" opacity="0.35" />
        <rect x="0" y="110" width="288" height="28" fill="#8b7d6b" opacity="0.2" />
        <path d="M55 50 L67 30 L80 50" fill="#9b8c7c" opacity="0.5" />
        <path d="M85 70 L100 48 L115 70" fill="#8b7d6b" opacity="0.4" />
        <ellipse cx="260" cy="30" rx="40" ry="12" fill="#9b8c7c" opacity="0.15" />
      </svg>

      {/* Bottom-left: West Lake + bridge */}
      <svg
        className="absolute bottom-0 left-0 w-72 h-64 opacity-[0.12]"
        viewBox="0 0 288 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 200 Q40 180 80 190 Q140 170 200 185 Q240 175 288 185 L288 256 L0 256 Z" fill="#9b8c7c" opacity="0.35" />
        <path d="M40 185 Q80 175 120 185 Q160 165 220 178 Q250 170 270 178" stroke="#8b7d6b" strokeWidth="2" opacity="0.5" fill="none" />
        <ellipse cx="100" cy="200" rx="25" ry="6" fill="#9b8c7c" opacity="0.25" />
        <ellipse cx="200" cy="195" rx="20" ry="5" fill="#8b7d6b" opacity="0.2" />
      </svg>

      {/* Bottom-right: sailboat + water */}
      <svg
        className="absolute bottom-0 right-0 w-64 h-56 opacity-[0.12]"
        viewBox="0 0 256 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 180 Q60 160 120 175 Q180 155 256 175 L256 224 L0 224 Z" fill="#8b7d6b" opacity="0.35" />
        <path d="M40 165 Q60 145 70 165" fill="#9b8c7c" opacity="0.4" />
        <line x1="55" y1="165" x2="55" y2="180" stroke="#9b8c7c" strokeWidth="1.5" opacity="0.4" />
        <path d="M140 158 Q155 140 165 158" fill="#9b8c7c" opacity="0.35" />
        <line x1="153" y1="158" x2="153" y2="175" stroke="#9b8c7c" strokeWidth="1.5" opacity="0.35" />
      </svg>
    </div>
  )
}
