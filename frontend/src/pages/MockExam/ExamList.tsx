import { useState } from 'react'
import { Clock, Target, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DEMO_EXAMS = [
  { id: '1', title: 'Simulacro General UNMSM', description: 'Simula el examen real de ingreso', total_questions: 50, time_limit_minutes: 120, difficulty_level: 3 },
  { id: '2', title: 'Simulacro Rápido', description: 'Práctica rápida de 20 minutos', total_questions: 20, time_limit_minutes: 20, difficulty_level: 2 },
  { id: '3', title: 'Simulacro de Geometría', description: 'Enfocado en temas geométricos', total_questions: 15, time_limit_minutes: 15, difficulty_level: 2 },
]

export default function ExamList() {
  const navigate = useNavigate()
  const [exams] = useState(DEMO_EXAMS)

  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'text-correct bg-correct/10'
      case 2: return 'text-xp bg-xp/10'
      case 3: return 'text-coral-400 bg-coral-50'
      default: return 'text-bark-400 bg-bark-100'
    }
  }

  const getDifficultyLabel = (level: number) => {
    switch (level) {
      case 1: return 'Fácil'
      case 2: return 'Medio'
      case 3: return 'Difícil'
      default: return 'N/A'
    }
  }

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-white border-b border-bark-100 px-4 py-4">
        <h1 className="text-xl font-display font-bold text-bark-800">Simulacros</h1>
        <p className="text-sm text-bark-400 mt-1">Practica como en el examen real de San Marcos</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => navigate(`/exams/${exam.id}`)}
            className="card-hover w-full text-left"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-coral-100 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-coral-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-bark-800">{exam.title}</h3>
                <p className="text-sm text-bark-400 mt-1">{exam.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-xs text-bark-400">
                    <Target size={12} />
                    {exam.total_questions} preguntas
                  </span>
                  <span className="flex items-center gap-1 text-xs text-bark-400">
                    <Clock size={12} />
                    {exam.time_limit_minutes} min
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getDifficultyColor(exam.difficulty_level)}`}>
                    {getDifficultyLabel(exam.difficulty_level)}
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-bark-300 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
