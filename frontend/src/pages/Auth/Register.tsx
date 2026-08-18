import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { isSupabaseConfigured } from '../../services/supabase'
import { Mail, Lock, User, Eye, EyeOff, Play } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, enterDemoMode } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      await register(email, password, username)
      toast.success('¡Cuenta creada!')
      navigate('/')
    } catch (error) {
      toast.error('Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = () => {
    enterDemoMode()
    toast.success('¡Modo demo activado!')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#FFD9A8] to-[#F5A66B] rounded-[42%] mb-4 shadow-[0_8px_0_#D97852]">
            <span className="text-5xl">🐹</span>
          </div>
          <h1 className="text-3xl font-display font-extrabold text-bark-800">cuiz</h1>
          <p className="text-bark-400 mt-1 text-sm font-semibold">Crea tu cuenta y empieza a estudiar</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-bark-100/70 p-6 shadow-card">
          {!isSupabaseConfigured && (
            <div className="mb-4 p-3 bg-coral-50 border border-coral-200 rounded-2xl">
              <p className="text-xs text-coral-600 text-center font-semibold">
                Base de datos no configurada. Usa el modo demo.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-bark-600 mb-1.5">Nombre de usuario</label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bark-300" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="estudiante123"
                  className="w-full rounded-2xl border-2 border-bark-100 bg-cream-50 py-3 pl-10 pr-4 text-sm font-semibold text-bark-700 placeholder:text-bark-300 transition-colors focus:border-primary-400 focus:outline-none"
                  required
                  minLength={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-bark-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bark-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-2xl border-2 border-bark-100 bg-cream-50 py-3 pl-10 pr-4 text-sm font-semibold text-bark-700 placeholder:text-bark-300 transition-colors focus:border-primary-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-bark-600 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bark-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border-2 border-bark-100 bg-cream-50 py-3 pl-10 pr-10 text-sm font-semibold text-bark-700 placeholder:text-bark-300 transition-colors focus:border-primary-400 focus:outline-none"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-bark-300 hover:text-bark-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-bark-600 mb-1.5">Confirmar contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-bark-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border-2 border-bark-100 bg-cream-50 py-3 pl-10 pr-4 text-sm font-semibold text-bark-700 placeholder:text-bark-300 transition-colors focus:border-primary-400 focus:outline-none"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-primary-400 py-3.5 text-sm font-extrabold text-white shadow-[0_4px_0_#D93A55] hover:bg-primary-500 hover:shadow-[0_5px_0_#D93A55] active:shadow-[0_2px_0_#D93A55] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-bark-100" />
            <span className="text-xs font-bold text-bark-300">o</span>
            <div className="flex-1 h-px bg-bark-100" />
          </div>

          <button
            onClick={handleDemo}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-primary-300 text-primary-500 font-extrabold rounded-2xl hover:bg-primary-50 transition-all"
          >
            <Play size={18} fill="currentColor" />
            Entrar en Modo Demo
          </button>

          <div className="mt-5 text-center">
            <p className="text-xs text-bark-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary-400 font-bold hover:text-primary-500">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] font-bold text-bark-300">
          🎓 Preparación para el examen de ingreso UNMSM
        </p>
      </div>
    </div>
  )
}
