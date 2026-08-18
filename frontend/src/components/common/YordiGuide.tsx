interface YordiGuideProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: { container: 'w-10 h-10 text-xl', bubble: 'max-w-[160px] text-xs px-2.5 py-1.5' },
  md: { container: 'w-14 h-14 text-3xl', bubble: 'max-w-[200px] text-sm px-3 py-2' },
  lg: { container: 'w-20 h-20 text-5xl', bubble: 'max-w-[240px] text-base px-4 py-2.5' },
}

export default function YordiGuide({ message, size = 'md', className = '' }: YordiGuideProps) {
  const s = sizes[size]

  return (
    <div className={`flex items-end gap-2.5 ${className}`}>
      <div
        className={`relative shrink-0 rounded-[42%] bg-gradient-to-br from-[#FFD9A8] to-[#F5A66B] shadow-[0_4px_0_#D97852] flex items-center justify-center ${s.container}`}
        aria-label="Yordi, la mascota de Cuiz"
        role="img"
      >
        <span className="absolute -top-2 text-sm -rotate-12">🎓</span>
        <span aria-hidden="true">🐹</span>
      </div>
      {message && (
        <div className={`relative rounded-2xl rounded-bl-sm border border-[#FFD8D1] bg-white font-bold leading-snug text-bark-600 shadow-card ${s.bubble}`}>
          {message}
          <div className="absolute -bottom-1.5 left-2 h-3 w-3 rotate-45 border-b border-r border-[#FFD8D1] bg-white" />
        </div>
      )}
    </div>
  )
}
