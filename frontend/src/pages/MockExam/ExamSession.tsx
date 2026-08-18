import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Clock, CheckCircle, XCircle, Trophy } from 'lucide-react'

const DEMO_EXERCISES = [
  { id: '1', type: 'multiple_choice', question: '¿Cómo se clasifica un ángulo de 45°?', options: ['Agudo', 'Recto', 'Obtuso', 'Llano'], correct: 0, explanation: 'Un ángulo agudo mide menos de 90°.' },
  { id: '2', type: 'multiple_choice', question: '¿Cuánto mide la hipotenusa de un triángulo con catetos 5 y 12?', options: ['13', '17', '7', '15'], correct: 0, explanation: 'c² = 5² + 12² = 25 + 144 = 169. c = 13.' },
  { id: '3', type: 'multiple_choice', question: '¿Cuántas diagonales tiene un pentágono?', options: ['5', '7', '10', '3'], correct: 0, explanation: 'Diagonales = n(n-3)/2 = 5(2)/2 = 5.' },
  { id: '4', type: 'multiple_choice', question: '¿Cuál es el área de un triángulo con base 10 y altura 6?', options: ['30', '60', '16', '80'], correct: 0, explanation: 'Área = (10 × 6) / 2 = 30.' },
  { id: '5', type: 'multiple_choice', question: '¿Cuánto suman los ángulos internos de un cuadrilátero?', options: ['360°', '180°', '540°', '720°'], correct: 0, explanation: 'La suma de ángulos internos de un cuadrilátero es 360°.' },
]

export default function ExamSession() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean }[]>([])
  const [timeLeft, setTimeLeft] = useState(300)
  const [completed, setCompleted] = useState(false)

  const exercise = DEMO_EXERCISES[currentIndex]

  useEffect(() => {
    if (!started || completed) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [started, completed])

  const handleAnswer = () => {
    if (selected === null) return
    const isCorrect = selected === exercise.correct
    setAnswers([...answers, { correct: isCorrect }])
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentIndex < DEMO_EXERCISES.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setCompleted(true)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  if (!started) {
    return (
      <div className="min-h-full bg-cream-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-coral-100 rounded-2xl flex items-center justify-center mx-auto">
            <AlertTriangle size={32} className="text-coral-400" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-bark-800">Simulacro</h1>
            <p className="text-bark-400 mt-2">{DEMO_EXERCISES.length} preguntas · 5 minutos</p>
          </div>
          <div className="bg-coral-50 border border-coral-200 rounded-xl p-3 text-sm text-coral-600">
            Una vez que empieces, el temporizador no se detendrá
          </div>
          <button onClick={() => setStarted(true)} className="btn-coral w-full">
            Empezar Simulacro
          </button>
          <button onClick={() => navigate(-1)} className="btn-ghost w-full text-sm">
            Cancelar
          </button>
        </div>
      </div>
    )
  }

  if (completed) {
    const correctCount = answers.filter(a => a.correct).length
    const score = Math.round((correctCount / DEMO_EXERCISES.length) * 100)
    const passed = score >= 60

    return (
      <div className="min-h-full bg-cream-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center space-y-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-correct/20' : 'bg-coral-100'}`}>
            {passed ? <Trophy size={40} className="text-correct" /> : <XCircle size={40} className="text-coral-400" />}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-bark-800">{passed ? '¡Aprobado!' : 'No aprobado'}</h1>
            <p className="text-bark-400 mt-2">{passed ? 'Excelente trabajo' : 'Sigue practicando'}</p>
          </div>
          <div className="text-5xl font-bold text-primary-400">{score}%</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="text-xl font-bold text-correct">{correctCount}</div>
              <div className="text-sm text-bark-400">Correctas</div>
            </div>
            <div className="stat-card">
              <div className="text-xl font-bold text-coral-400">{DEMO_EXERCISES.length - correctCount}</div>
              <div className="text-sm text-bark-400">Incorrectas</div>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="btn-primary w-full">
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-white border-b border-bark-100 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-bark-400">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-bold text-bark-600">{currentIndex + 1}/{DEMO_EXERCISES.length}</span>
          <div className={`flex items-center gap-1 font-bold ${timeLeft < 60 ? 'text-coral-400' : 'text-bark-600'}`}>
            <Clock size={16} />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="mt-2 progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIndex + 1) / DEMO_EXERCISES.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="card space-y-6">
          <h2 className="text-lg font-bold text-bark-800">{exercise.question}</h2>

          <div className="space-y-3">
            {exercise.options.map((option, index) => {
              let optionClass = 'exercise-option'
              if (answered) {
                if (index === exercise.correct) optionClass += ' correct'
                else if (index === selected && !answered) optionClass += ' incorrect'
              } else if (index === selected) {
                optionClass += ' selected'
              }

              return (
                <button
                  key={index}
                  onClick={() => !answered && setSelected(index)}
                  disabled={answered}
                  className={optionClass}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-left">{option}</span>
                    {answered && index === exercise.correct && <CheckCircle size={18} className="text-correct" />}
                    {answered && index === selected && index !== exercise.correct && <XCircle size={18} className="text-coral-400" />}
                  </div>
                </button>
              )
            })}
          </div>

          {answered && (
            <div className={`p-4 rounded-xl ${selected === exercise.correct ? 'bg-correct/10 border border-correct/30' : 'bg-coral-50 border border-coral-200'}`}>
              <div className={`font-bold ${selected === exercise.correct ? 'text-correct' : 'text-coral-500'}`}>
                {selected === exercise.correct ? '¡Correcto!' : 'Incorrecto'}
              </div>
              <p className="text-sm text-bark-600 mt-1">{exercise.explanation}</p>
            </div>
          )}

          {!answered ? (
            <button onClick={handleAnswer} disabled={selected === null} className="btn-primary w-full disabled:opacity-50">
              Verificar
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary w-full">
              {currentIndex < DEMO_EXERCISES.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
