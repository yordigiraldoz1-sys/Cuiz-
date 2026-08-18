import { useState } from 'react'
import { Trophy, Lock, Zap } from 'lucide-react'

const DEMO_ACHIEVEMENTS = [
  { id: '1', name: 'Primeros pasos', description: 'Completa tu primera lección', icon: '🎯', category: 'general', xp_reward: 50, earned: true },
  { id: '2', name: 'Racha de 3', description: 'Mantén una racha de 3 días', icon: '🔥', category: 'streak', xp_reward: 100, earned: true },
  { id: '3', name: 'Racha de 7', description: 'Mantén una racha de 7 días', icon: '🔥', category: 'streak', xp_reward: 250, earned: false },
  { id: '4', name: 'Maestro de Ángulos', description: 'Completa todos los subtemas de Ángulos', icon: '📐', category: 'subject', xp_reward: 200, earned: false },
  { id: '5', name: 'Pitágoras', description: 'Resuelve 10 ejercicios de Pitágoras', icon: '🔺', category: 'subject', xp_reward: 150, earned: false },
  { id: '6', name: '1000 XP', description: 'Acumula 1000 XP en total', icon: '⚡', category: 'xp', xp_reward: 100, earned: true },
  { id: '7', name: '5000 XP', description: 'Acumula 5000 XP en total', icon: '⚡', category: 'xp', xp_reward: 500, earned: false },
  { id: '8', name: 'Primer simulacro', description: 'Completa tu primer simulacro', icon: '📝', category: 'exam', xp_reward: 200, earned: false },
]

export default function Achievements() {
  const [achievements] = useState(DEMO_ACHIEVEMENTS)
  const earnedCount = achievements.filter(a => a.earned).length

  const categories = [
    { id: 'general', name: 'General', icon: '🎯' },
    { id: 'streak', name: 'Rachas', icon: '🔥' },
    { id: 'subject', name: 'Materias', icon: '📚' },
    { id: 'xp', name: 'Experiencia', icon: '⚡' },
    { id: 'exam', name: 'Exámenes', icon: '📝' },
  ]

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-white border-b border-bark-100 px-4 py-4">
        <h1 className="text-xl font-display font-bold text-bark-800">Logros</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-xp/20 rounded-2xl flex items-center justify-center">
              <Trophy size={28} className="text-xp" />
            </div>
            <div>
              <div className="text-2xl font-bold text-bark-800">{earnedCount}/{achievements.length}</div>
              <div className="text-sm text-bark-400">Logros desbloqueados</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category) => {
            const categoryAchievements = achievements.filter(a => a.category === category.id)
            if (categoryAchievements.length === 0) return null

            return (
              <div key={category.id}>
                <h2 className="font-bold text-bark-700 mb-3 flex items-center gap-2">
                  <span>{category.icon}</span>
                  {category.name}
                </h2>
                <div className="space-y-3">
                  {categoryAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`card flex items-center gap-4 ${
                        achievement.earned ? 'border-2 border-xp/30 bg-xp/5' : 'opacity-60'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        achievement.earned ? 'bg-xp/20' : 'bg-bark-100'
                      }`}>
                        {achievement.earned ? achievement.icon : <Lock size={20} className="text-bark-300" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-bark-800 text-sm">{achievement.name}</h3>
                        <p className="text-xs text-bark-400">{achievement.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-xp">
                        <Zap size={14} />
                        +{achievement.xp_reward}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
