import { Zap } from 'lucide-react'

interface XPBarProps {
  currentXP: number
  level: number
  xpToNextLevel: number
}

export default function XPBar({ currentXP, level, xpToNextLevel }: XPBarProps) {
  const percentage = Math.min((currentXP / xpToNextLevel) * 100, 100)

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Zap size={20} className="text-xp" />
        <span className="font-bold text-bark-800">{currentXP}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-bark-600">Nivel {level}</span>
          <span className="text-xs text-bark-400">{xpToNextLevel - currentXP} XP para subir</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  )
}
