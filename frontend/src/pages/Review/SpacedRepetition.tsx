import { useState } from 'react'
import { RotateCcw, BookOpen, CheckCircle, X } from 'lucide-react'

const DEMO_CARDS = [
  { id: '1', question: '¿Cómo se clasifica un ángulo de 135°?', answer: 'Obtuso', topic: 'Ángulos' },
  { id: '2', question: '¿Cuánto mide la hipotenusa de un triángulo con catetos 3 y 4?', answer: '5', topic: 'Pitágoras' },
  { id: '3', question: '¿Cuántas diagonales tiene un hexágono?', answer: '9', topic: 'Polígonos' },
  { id: '4', question: '¿Cuánto suman los ángulos internos de un triángulo?', answer: '180°', topic: 'Triángulos' },
  { id: '5', question: '¿Cuál es el área de un círculo de radio 7? (usa π≈22/7)', answer: '154 cm²', topic: 'Círculo' },
]

export default function SpacedRepetition() {
  const [cards] = useState(DEMO_CARDS)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 })

  const currentCard = cards[currentIndex]

  const handleAnswer = (isCorrect: boolean) => {
    setStats(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
    }))

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    } else {
      setCompleted(true)
    }
  }

  if (completed) {
    return (
      <div className="min-h-full bg-cream-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-correct/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-correct" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-bark-800">¡Repaso completado!</h1>
            <p className="text-bark-400 mt-2">Has reforzado tu conocimiento</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card">
              <div className="text-2xl font-bold text-correct">{stats.correct}</div>
              <div className="text-sm text-bark-400">Correctas</div>
            </div>
            <div className="stat-card">
              <div className="text-2xl font-bold text-coral-400">{stats.incorrect}</div>
              <div className="text-sm text-bark-400">Incorrectas</div>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="btn-primary w-full">
            Repasar de nuevo
          </button>
        </div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-full bg-cream-100 flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <RotateCcw size={40} className="text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-bark-800">¡Sin tarjetas!</h1>
            <p className="text-bark-400 mt-2">Completa más lecciones para agregar ejercicios al repaso</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-cream-100">
      <div className="bg-white border-b border-bark-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-display font-bold text-bark-800">Repasar</h1>
          <span className="text-sm text-bark-400">{currentIndex + 1}/{cards.length}</span>
        </div>
        <div className="mt-2 progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-8">
        <div className="card space-y-6">
          <div className="flex items-center gap-2 text-xs text-bark-400">
            <BookOpen size={14} />
            <span>{currentCard.topic}</span>
          </div>

          <h2 className="text-lg font-bold text-bark-800">{currentCard.question}</h2>

          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)} className="btn-primary w-full">
              Mostrar respuesta
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-4 text-center">
                <div className="text-sm text-primary-600 mb-1">Respuesta:</div>
                <div className="text-xl font-bold text-primary-700">{currentCard.answer}</div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleAnswer(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-coral-200 text-coral-500 font-bold rounded-2xl hover:bg-coral-50"
                >
                  <X size={20} />
                  No sabía
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-correct text-correct font-bold rounded-2xl hover:bg-correct/10"
                >
                  <CheckCircle size={20} />
                  Lo sabía
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
