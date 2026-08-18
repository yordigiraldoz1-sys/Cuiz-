import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface TrueFalseProps {
  question: string
  correctAnswer: boolean
  explanation: string
  onSubmit: (answer: boolean, isCorrect: boolean) => void
  disabled?: boolean
}

export default function TrueFalse({
  question,
  correctAnswer,
  explanation,
  onSubmit,
  disabled = false,
}: TrueFalseProps) {
  const [selected, setSelected] = useState<boolean | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selected === null || disabled) return

    const correct = selected === correctAnswer
    setIsCorrect(correct)
    setAnswered(true)
    onSubmit(selected, correct)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => !answered && setSelected(true)}
          disabled={answered || disabled}
          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
            answered
              ? correctAnswer
                ? 'border-correct bg-correct/10'
                : selected === true
                  ? 'border-incorrect bg-incorrect/10'
                  : 'border-gray-200'
              : selected === true
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <div className="text-center">
            <div className={`text-4xl font-bold ${
              answered && correctAnswer
                ? 'text-correct'
                : answered && selected === true && !isCorrect
                  ? 'text-incorrect'
                  : selected === true
                    ? 'text-primary-500'
                    : 'text-gray-400'
            }`}>
              V
            </div>
            <div className="mt-2 font-medium text-gray-700">Verdadero</div>
          </div>
        </button>

        <button
          onClick={() => !answered && setSelected(false)}
          disabled={answered || disabled}
          className={`p-6 rounded-xl border-2 transition-all duration-200 ${
            answered
              ? !correctAnswer
                ? 'border-correct bg-correct/10'
                : selected === false
                  ? 'border-incorrect bg-incorrect/10'
                  : 'border-gray-200'
              : selected === false
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <div className="text-center">
            <div className={`text-4xl font-bold ${
              answered && !correctAnswer
                ? 'text-correct'
                : answered && selected === false && !isCorrect
                  ? 'text-incorrect'
                  : selected === false
                    ? 'text-primary-500'
                    : 'text-gray-400'
            }`}>
              F
            </div>
            <div className="mt-2 font-medium text-gray-700">Falso</div>
          </div>
        </button>
      </div>

      {answered && (
        <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/10 border border-correct/30' : 'bg-incorrect/10 border border-incorrect/30'}`}>
          <div className={`flex items-center gap-2 font-semibold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
          {!isCorrect && (
            <p className="mt-2 text-gray-600">
              Respuesta correcta: {correctAnswer ? 'Verdadero' : 'Falso'}
            </p>
          )}
          <p className="mt-2 text-gray-600">{explanation}</p>
        </div>
      )}

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>
      )}
    </div>
  )
}
