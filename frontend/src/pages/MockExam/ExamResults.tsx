import { Link } from 'react-router-dom'
import { XCircle, Clock, Target, Home } from 'lucide-react'

export default function ExamResults() {
  return (
    <div className="min-h-full bg-cream-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full space-y-6 text-center">
        <div className="w-20 h-20 bg-coral-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle size={40} className="text-coral-400" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-bark-800">Resultados</h1>
          <p className="text-bark-400 mt-2">Los resultados se mostrarán cuando configures Supabase</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <Clock size={20} className="text-bark-300 mx-auto mb-1" />
            <div className="font-bold text-bark-600">--</div>
            <div className="text-xs text-bark-400">Tiempo</div>
          </div>
          <div className="stat-card">
            <Target size={20} className="text-bark-300 mx-auto mb-1" />
            <div className="font-bold text-bark-600">--</div>
            <div className="text-xs text-bark-400">Puntuación</div>
          </div>
        </div>
        <Link to="/" className="btn-primary w-full block">
          <Home size={18} className="inline mr-2" />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
