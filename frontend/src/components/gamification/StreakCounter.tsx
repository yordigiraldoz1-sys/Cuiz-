import { Flame } from 'lucide-react'

interface StreakCounterProps {
  streak: number
  longestStreak: number
}

export default function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`p-2 rounded-xl ${streak > 0 ? 'bg-streak/10' : 'bg-bark-100'}`}>
        <Flame size={24} className={streak > 0 ? 'text-streak' : 'text-bark-300'} />
      </div>
      <div>
        <div className="font-bold text-bark-800">{streak}</div>
        <div className="text-xs text-bark-400">días de racha</div>
      </div>
      {longestStreak > 0 && (
        <div className="ml-2 text-xs text-bark-300">
          (máx: {longestStreak})
        </div>
      )}
    </div>
  )
}
