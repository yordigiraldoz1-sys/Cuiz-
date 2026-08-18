import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../services/supabase'
import { useExerciseStore } from '../../store/useExerciseStore'
import MultipleChoice from '../../components/exercises/MultipleChoice'
import FillInBlank from '../../components/exercises/FillInBlank'
import DragAndDrop from '../../components/exercises/DragAndDrop'
import NumericResponse from '../../components/exercises/NumericResponse'
import TrueFalse from '../../components/exercises/TrueFalse'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import type { Exercise } from '../../types'
import { recordLearningAttempt } from '../../services/learningProgress'

const DEMO_EXERCISES: Exercise[] = [
  {
    id: 'e1',
    lesson_id: 'l1',
    type: 'multiple_choice',
    question: '¿Cuánto es 15 + 27?',
    question_data: { options: ['42', '41', '43', '40'] },
    correct_answer: { value: 0 },
    explanation: '15 + 27 = 42. Sumamos las unidades (5+7=12) y las decenas (10+20=30), luego 30+12=42.',
    difficulty: 1,
    xp_reward: 10,
    display_order: 1,
  },
  {
    id: 'e2',
    lesson_id: 'l1',
    type: 'true_false',
    question: 'El resultado de 8 × 7 es 56.',
    question_data: {},
    correct_answer: { value: true },
    explanation: '8 × 7 = 56 es correcto.',
    difficulty: 1,
    xp_reward: 10,
    display_order: 2,
  },
  {
    id: 'e3',
    lesson_id: 'l1',
    type: 'numeric',
    question: '¿Cuánto es 144 ÷ 12?',
    question_data: {},
    correct_answer: { value: 12 },
    explanation: '144 ÷ 12 = 12. Verificación: 12 × 12 = 144.',
    difficulty: 1,
    xp_reward: 15,
    display_order: 3,
  },
  {
    id: 'e4',
    lesson_id: 'l1',
    type: 'multiple_choice',
    question: '¿Cuál es el resultado de 3² + 4²?',
    question_data: { options: ['7', '25', '12', '49'] },
    correct_answer: { value: 1 },
    explanation: '3² = 9 y 4² = 16. Entonces 9 + 16 = 25.',
    difficulty: 2,
    xp_reward: 15,
    display_order: 4,
  },
  {
    id: 'e5',
    lesson_id: 'l1',
    type: 'fill_blank',
    question: 'La raíz cuadrada de ___ es 9.',
    question_data: { blanks: 1 },
    correct_answer: { value: ['81'] },
    explanation: '9² = 81, por lo tanto √81 = 9.',
    difficulty: 2,
    xp_reward: 20,
    display_order: 5,
  },
]

export default function ExerciseSession() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)

  const {
    currentExerciseIndex,
    sessionXP,
    sessionCorrect,
    sessionTotal,
    startLesson,
    submitAnswer,
    nextExercise,
    completeLesson,
  } = useExerciseStore()

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setExercises(DEMO_EXERCISES)
      startLesson({ id: lessonId || 'l1', title: 'Lección Demo', topic_id: 't1', estimated_minutes: 10, display_order: 1, xp_reward: 50 } as any, DEMO_EXERCISES)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      if (!lessonId) return

      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .single()

      const { data: exercisesData } = await supabase
        .from('exercises')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('display_order')

      setExercises(exercisesData || [])

      if (lessonData && exercisesData) {
        startLesson(lessonData, exercisesData)
      }

      setLoading(false)
    }

    fetchData()
  }, [lessonId, startLesson])

  const handleAnswer = (exerciseId: string, answer: unknown, isCorrect: boolean) => {
    submitAnswer(exerciseId, answer, isCorrect)
    recordLearningAttempt({ nodeId: 'generic-exercise', lessonId: lessonId || 'l1', questionId: exerciseId, correct: isCorrect })
  }

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      nextExercise()
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    if (isSupabaseConfigured) {
      await completeLesson()
    }
    setCompleted(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (completed) {
    const accuracy = Math.round((sessionCorrect / sessionTotal) * 100)

    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] border border-bark-100 shadow-card max-w-md w-full text-center space-y-6 p-8">
          <div className="animate-bounce-in">
            {accuracy >= 70 ? (
              <div className="w-24 h-24 bg-correct/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={48} className="text-correct" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-incorrect/20 rounded-full flex items-center justify-center mx-auto">
                <XCircle size={48} className="text-incorrect" />
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-display font-extrabold text-bark-800">
              {accuracy >= 70 ? '¡Excelente!' : 'Sigue practicando'}
            </h1>
            <p className="text-bark-400 mt-2">
              {accuracy >= 70
                ? 'Has completado esta lección con éxito'
                : 'No te rindas, ¡la práctica hace al maestro!'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cream-100 rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-xp">{sessionXP}</div>
              <div className="text-xs font-bold text-bark-400">XP ganado</div>
            </div>
            <div className="bg-cream-100 rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-primary-500">{accuracy}%</div>
              <div className="text-xs font-bold text-bark-400">Precisión</div>
            </div>
            <div className="bg-cream-100 rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-correct">{sessionCorrect}/{sessionTotal}</div>
              <div className="text-xs font-bold text-bark-400">Correctas</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full rounded-2xl bg-primary-400 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-primary-500 transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  const currentExercise = exercises[currentExerciseIndex]
  if (!currentExercise) return null

  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100

  const renderExercise = () => {
    switch (currentExercise.type) {
      case 'multiple_choice':
        return (
          <MultipleChoice
            question={currentExercise.question}
            options={currentExercise.question_data.options || []}
            correctAnswer={currentExercise.correct_answer.value as number}
            explanation={currentExercise.explanation}
            onSubmit={(answer, isCorrect) => handleAnswer(currentExercise.id, answer, isCorrect)}
          />
        )
      case 'fill_blank':
        return (
          <FillInBlank
            question={currentExercise.question}
            blanks={currentExercise.question_data.blanks || 1}
            correctAnswers={currentExercise.correct_answer.value as string[]}
            explanation={currentExercise.explanation}
            onSubmit={(answers, isCorrect) => handleAnswer(currentExercise.id, answers, isCorrect)}
          />
        )
      case 'drag_drop':
        return (
          <DragAndDrop
            question={currentExercise.question}
            items={currentExercise.question_data.items || []}
            correctMapping={currentExercise.correct_answer.value as Record<string, string>}
            explanation={currentExercise.explanation}
            onSubmit={(mapping, isCorrect) => handleAnswer(currentExercise.id, mapping, isCorrect)}
          />
        )
      case 'numeric':
        return (
          <NumericResponse
            question={currentExercise.question}
            correctAnswer={currentExercise.correct_answer.value as number}
            explanation={currentExercise.explanation}
            onSubmit={(answer, isCorrect) => handleAnswer(currentExercise.id, answer, isCorrect)}
          />
        )
      case 'true_false':
        return (
          <TrueFalse
            question={currentExercise.question}
            correctAnswer={currentExercise.correct_answer.value as boolean}
            explanation={currentExercise.explanation}
            onSubmit={(answer, isCorrect) => handleAnswer(currentExercise.id, answer, isCorrect)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="bg-white border-b border-bark-100/80 p-4 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl p-2 text-bark-500 hover:bg-bark-50"
            >
              <ArrowLeft size={21} />
            </button>
            <div className="flex-1">
              <div className="h-2.5 overflow-hidden rounded-full bg-bark-100">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-300 to-primary-400 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="text-xs font-bold text-bark-400">
              {currentExerciseIndex + 1}/{exercises.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {renderExercise()}

        <div className="mt-8">
          <button onClick={handleNext} className="w-full rounded-2xl bg-primary-400 py-3.5 text-sm font-extrabold text-white shadow-md hover:bg-primary-500 transition-colors">
            {currentExerciseIndex < exercises.length - 1 ? 'Siguiente' : 'Completar'}
          </button>
        </div>
      </div>
    </div>
  )
}
