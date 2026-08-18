import { useAuthStore } from '../../store/useAuthStore'
import { User, LogOut, Trophy, Target, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const calculateLevel = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1
  const calculateXPToNextLevel = (xp: number) => {
    const level = calculateLevel(xp)
    const nextLevelXP = Math.pow(level, 2) * 100
    return nextLevelXP - xp
  }

  const level = user?.current_level || 1
  const xp = user?.total_xp || 0
  const xpNeeded = calculateXPToNextLevel(xp)
  const xpProgress = xpNeeded > 0 ? ((xpNeeded - calculateXPToNextLevel(xp)) / xpNeeded) * 100 : 0

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-gradient-to-r from-primary-400 to-primary-500 text-white p-6 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={40} />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-display font-extrabold">{user?.username}</h1>
              <p className="text-white/80 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 -mt-4">
        <div className="bg-white rounded-[2rem] border border-bark-100/70 p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-500">Nivel {level}</p>
              <p className="text-xs font-bold text-bark-400">{xpNeeded} XP para siguiente nivel</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold text-bark-800">{xp}</p>
              <p className="text-[10px] font-bold text-bark-400">XP total</p>
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-bark-100">
            <div className="h-full rounded-full bg-gradient-to-r from-primary-300 to-primary-400 transition-all" style={{ width: `${Math.min(xpProgress, 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-[2rem] border border-bark-100/70 p-5 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-streak/15">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary-500">Tu racha</p>
              <p className="text-lg font-extrabold text-bark-800">{user?.current_streak || 0} días</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-cream-100 px-3 py-2.5 text-xs font-bold text-bark-500">
            <span>🏆</span> Mejor racha: <span className="text-bark-800">{user?.longest_streak || 0} días</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[2rem] border border-bark-100/70 p-5 shadow-card text-center">
            <BookOpen size={24} className="text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-bark-800">{level}</div>
            <div className="text-xs font-bold text-bark-400">Nivel actual</div>
          </div>
          <div className="bg-white rounded-[2rem] border border-bark-100/70 p-5 shadow-card text-center">
            <Target size={24} className="text-coral-400 mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-bark-800">{xp}</div>
            <div className="text-xs font-bold text-bark-400">XP total</div>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-bark-100/70 p-5 shadow-card">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-bark-300 mb-3">Cuenta</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/achievements')}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-cream-100 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-xp/15">
                <Trophy size={20} className="text-xp" />
              </div>
              <span className="flex-1 text-left font-bold text-bark-700">Mis logros</span>
              <span className="text-bark-300">→</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-coral-50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral-50">
                <LogOut size={20} className="text-coral-400" />
              </div>
              <span className="flex-1 text-left font-bold text-coral-400">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
