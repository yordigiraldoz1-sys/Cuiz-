import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

interface MultipleChoiceProps {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  onSubmit: (answer: number, isCorrect: boolean) => void
  disabled?: boolean
}

export default function MultipleChoice({
  question,
  options,
  correctAnswer,
  explanation,
  onSubmit,
  disabled = false,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (selected === null || disabled) return

    const correct = selected === correctAnswer
    setIsCorrect(correct)
    setAnswered(true)
    onSubmit(selected, correct)
  }

  const getOptionClass = (index: number) => {
    if (!answered) {
      return selected === index ? 'selected' : ''
    }
    if (index === correctAnswer) return 'correct'
    if (index === selected && !isCorrect) return 'incorrect'
    return ''
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !answered && setSelected(index)}
            disabled={answered || disabled}
            className={`exercise-option ${getOptionClass(index)}`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-left">{option}</span>
              {answered && index === correctAnswer && (
                <CheckCircle size={20} className="text-correct" />
              )}
              {answered && index === selected && !isCorrect && (
                <XCircle size={20} className="text-incorrect" />
              )}
            </div>
          </button>
        ))}
      </div>

      {answered && (
        <div className={`p-4 rounded-xl ${isCorrect ? 'bg-correct/10 border border-correct/30' : 'bg-incorrect/10 border border-incorrect/30'}`}>
          <div className={`flex items-center gap-2 font-semibold ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
            {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </div>
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
