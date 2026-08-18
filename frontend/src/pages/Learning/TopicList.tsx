import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../services/supabase'
import { useAuthStore } from '../../store/useAuthStore'
import BottomNav from '../../components/navigation/BottomNav'
import { ArrowLeft, Clock, Zap, CheckCircle, Lock } from 'lucide-react'
import type { Topic, Lesson, UserProgress } from '../../types'

const DEMO_LESSONS: Lesson[] = [
  { id: 'l1', topic_id: 't1', title: 'Suma y Resta', description: 'Operaciones básicas', estimated_minutes: 10, display_order: 1, xp_reward: 50 },
  { id: 'l2', topic_id: 't1', title: 'Multiplicación', description: 'Tablas y propiedades', estimated_minutes: 15, display_order: 2, xp_reward: 50 },
  { id: 'l3', topic_id: 't1', title: 'División', description: 'División entera y decimal', estimated_minutes: 15, display_order: 3, xp_reward: 75 },
  { id: 'l4', topic_id: 't2', title: 'Ecuaciones lineales', description: 'Resolver ecuaciones de primer grado', estimated_minutes: 20, display_order: 1, xp_reward: 100 },
  { id: 'l5', topic_id: 't3', title: 'Áreas de figuras', description: 'Triángulo, cuadrado, círculo', estimated_minutes: 15, display_order: 1, xp_reward: 75 },
]

export default function TopicList() {
  const { subjectId } = useParams()
  const { user } = useAuthStore()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setTopic({ id: subjectId || '', subject_id: '1', name: 'Tema de ejemplo', description: 'Descripción del tema', display_order: 1, difficulty_level: 1 })
      setLessons(DEMO_LESSONS)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      if (!subjectId) return

      const { data: topicData } = await supabase
        .from('topics')
        .select('*')
        .eq('id', subjectId)
        .single()

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('topic_id', subjectId)
        .order('display_order')

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id || '')

      setTopic(topicData)
      setLessons(lessonsData || [])
      setProgress(progressData || [])
      setLoading(false)
    }

    fetchData()
  }, [subjectId, user])

  const getLessonProgress = (lessonId: string) => {
    return progress.find(p => p.lesson_id === lessonId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link to="/subjects" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-display font-bold text-gray-800">
            {topic?.name || 'Lecciones'}
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-4">
          {lessons.map((lesson, index) => {
            const lessonProgress = getLessonProgress(lesson.id)
            const isCompleted = lessonProgress?.status === 'completed'
            const isLocked = index > 0 && !getLessonProgress(lessons[index - 1].id)

            return (
              <Link
                key={lesson.id}
                to={isLocked ? '#' : `/lessons/${lesson.id}/exercises`}
                className={`card flex items-center gap-4 transition-all ${
                  isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : isCompleted
                      ? 'border-2 border-correct/30'
                      : 'card-hover'
                }`}
                onClick={(e) => isLocked && e.preventDefault()}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold ${
                    isCompleted
                      ? 'bg-correct'
                      : isLocked
                        ? 'bg-gray-300'
                        : 'bg-primary-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={24} />
                  ) : isLocked ? (
                    <Lock size={20} />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {lesson.estimated_minutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap size={14} className="text-xp" />
                      {lesson.xp_reward} XP
                    </span>
                  </div>
                </div>

                {isCompleted && lessonProgress && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-correct">
                      {lessonProgress.best_score}%
                    </div>
                    <div className="text-xs text-gray-400">mejor</div>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
