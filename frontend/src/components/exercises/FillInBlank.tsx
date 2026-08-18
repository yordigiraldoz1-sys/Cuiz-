import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface FillInBlankProps {
  question: string
  blanks: number
  correctAnswers: string[]
  explanation: string
  onSubmit: (answers: string[], isCorrect: boolean) => void
  disabled?: boolean
}

export default function FillInBlank({
  question,
  blanks,
  correctAnswers,
  explanation,
  onSubmit,
  disabled = false,
}: FillInBlankProps) {
  const [answers, setAnswers] = useState<string[]>(Array(blanks).fill(''))
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    if (disabled) return

    const correct = answers.every(
      (answer, index) => answer.toLowerCase().trim() === correctAnswers[index].toLowerCase().trim()
    )
    setIsCorrect(correct)
    setAnswered(true)
    onSubmit(answers, correct)
  }

  const parts = question.split('___')

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-gray-800 leading-relaxed">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < blanks && (
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={answered || disabled}
                placeholder="..."
                className={`inline-block w-32 mx-1 px-3 py-1 border-b-2 text-center font-medium transition-colors ${
                  answered
                    ? answers[index].toLowerCase().trim() === correctAnswers[index].toLowerCase().trim()
                      ? 'border-correct text-correct bg-correct/10'
                      : 'border-incorrect text-incorrect bg-incorrect/10'
                    : 'border-gray-300 focus:border-primary-500 bg-transparent'
                }`}
              />
            )}
          </span>
        ))}
      </div>

      {answered && (
        <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/10 border border-correct/30' : 'bg-incorrect/10 border border-incorrect/30'}`}>
          <div className={`flex items-center gap-2 font-semibold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
          {!isCorrect && (
            <p className="mt-2 text-gray-600">
              Respuesta correcta: {correctAnswers.join(', ')}
            </p>
          )}
          <p className="mt-2 text-gray-600">{explanation}</p>
        </div>
      )}

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={answers.some((a) => a.trim() === '')}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>
      )}
    </div>
  )
}
