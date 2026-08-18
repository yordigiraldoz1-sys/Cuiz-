import { useState } from 'react'
import { Medal, Crown, Flame, Zap } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

type PeriodType = 'weekly' | 'monthly' | 'all_time'

const DEMO_LEADERBOARD = [
  { rank: 1, username: 'MaríaG', xp: 4200, streak: 15 },
  { rank: 2, username: 'CarlosM', xp: 3800, streak: 12 },
  { rank: 3, username: 'AnaTorres', xp: 3500, streak: 10 },
  { rank: 4, username: 'LuisR', xp: 3100, streak: 8 },
  { rank: 5, username: 'PedroS', xp: 2900, streak: 7 },
  { rank: 6, username: 'SofiaH', xp: 2600, streak: 6 },
  { rank: 7, username: 'DiegoP', xp: 2400, streak: 5 },
  { rank: 8, username: 'ValeriaC', xp: 2200, streak: 4 },
  { rank: 9, username: 'AndrésL', xp: 1900, streak: 3 },
  { rank: 10, username: 'CamilaR', xp: 1700, streak: 2 },
]

export default function Leaderboard() {
  const { user } = useAuthStore()
  const [period, setPeriod] = useState<PeriodType>('weekly')

  const periods = [
    { key: 'weekly' as PeriodType, label: 'Semanal' },
    { key: 'monthly' as PeriodType, label: 'Mensual' },
    { key: 'all_time' as PeriodType, label: 'Total' },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={20} className="text-yellow-500" />
      case 2: return <Medal size={20} className="text-gray-400" />
      case 3: return <Medal size={20} className="text-amber-600" />
      default: return <span className="text-bark-400 font-bold text-sm">{rank}</span>
    }
  }

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-gradient-to-r from-warm-400 to-warm-500 text-white p-6">
        <h1 className="text-xl font-display font-bold mb-4">Ranking</h1>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${
                period === p.key
                  ? 'bg-white text-warm-600'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="card mb-4 border-2 border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
              11
            </div>
            <div className="flex-1">
              <div className="font-bold text-bark-800">{user?.username || 'Tú'}</div>
              <div className="text-sm text-bark-400">Tu posición</div>
            </div>
            <div className="flex items-center gap-1 font-bold text-xp">
              <Zap size={16} />
              {user?.total_xp || 2500} XP
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {DEMO_LEADERBOARD.map((entry) => (
            <div
              key={entry.rank}
              className="card flex items-center gap-4"
            >
              <div className="w-8 flex justify-center">
                {getRankIcon(entry.rank)}
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-sm">
                  {entry.username.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="font-bold text-bark-800 text-sm">{entry.username}</div>
                <div className="flex items-center gap-1 text-xs text-bark-400">
                  <Flame size={12} className="text-streak" />
                  {entry.streak} días
                </div>
              </div>
              <div className="flex items-center gap-1 font-bold text-xp text-sm">
                <Zap size={14} />
                {entry.xp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
