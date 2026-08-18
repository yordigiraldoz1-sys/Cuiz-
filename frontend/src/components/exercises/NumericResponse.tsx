import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface NumericResponseProps {
  question: string
  correctAnswer: number
  tolerance?: number
  placeholder?: string
  explanation: string
  onSubmit: (answer: number, isCorrect: boolean) => void
  disabled?: boolean
}

export default function NumericResponse({
  question,
  correctAnswer,
  tolerance = 0.01,
  placeholder = 'Escribe tu respuesta',
  explanation,
  onSubmit,
  disabled = false,
}: NumericResponseProps) {
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (disabled || answer === '') return

    const numAnswer = parseFloat(answer)
    const correct = Math.abs(numAnswer - correctAnswer) <= tolerance
    setIsCorrect(correct)
    setAnswered(true)
    onSubmit(numAnswer, correct)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>

      <div className="relative">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={answered || disabled}
          placeholder={placeholder}
          step="any"
          className={`input-field text-center text-2xl font-bold py-4 ${
            answered
              ? isCorrect
                ? 'border-correct bg-correct/10 text-correct'
                : 'border-incorrect bg-incorrect/10 text-incorrect'
              : ''
          }`}
        />
        {answered && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isCorrect ? (
              <CheckCircle size={24} className="text-correct" />
            ) : (
              <XCircle size={24} className="text-incorrect" />
            )}
          </div>
        )}
      </div>

      {answered && (
        <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/10 border border-correct/30' : 'bg-incorrect/10 border border-incorrect/30'}`}>
          <div className={`flex items-center gap-2 font-semibold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
          {!isCorrect && (
            <p className="mt-2 text-gray-600">
              Respuesta correcta: {correctAnswer}
            </p>
          )}
          <p className="mt-2 text-gray-600">{explanation}</p>
        </div>
      )}

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={answer === ''}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>
      )}
    </div>
  )
}
