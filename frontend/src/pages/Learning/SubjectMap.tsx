import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../../services/supabase'
import { useAuthStore } from '../../store/useAuthStore'
import BottomNav from '../../components/navigation/BottomNav'
import { ArrowLeft, ArrowRight, Lock, CheckCircle } from 'lucide-react'
import type { Subject, Topic, UserProgress } from '../../types'

const DEMO_SUBJECTS: Subject[] = [
  { id: '1', name: 'Matemáticas', description: 'Álgebra, geometría, aritmética', color: '#3B82F6', display_order: 1 },
  { id: '2', name: 'Comunicación', description: 'Comprensión lectora, gramática', color: '#10B981', display_order: 2 },
  { id: '3', name: 'Historia del Perú y Mundo', description: 'Historia, geografía', color: '#F59E0B', display_order: 3 },
  { id: '4', name: 'Razonamiento', description: 'Lógico, verbal, matemático', color: '#8B5CF6', display_order: 4 },
  { id: '5', name: 'Ciencias Naturales', description: 'Física, química, biología', color: '#EF4444', display_order: 5 },
]

const DEMO_TOPICS: Topic[] = [
  { id: 't1', subject_id: '1', name: 'Aritmética', description: 'Operaciones básicas', display_order: 1, difficulty_level: 1 },
  { id: 't2', subject_id: '1', name: 'Álgebra', description: 'Ecuaciones', display_order: 2, difficulty_level: 2 },
  { id: 't3', subject_id: '1', name: 'Geometría', description: 'Figuras y áreas', display_order: 3, difficulty_level: 2 },
  { id: 't4', subject_id: '2', name: 'Comprensión Lectora', description: 'Interpretación de textos', display_order: 1, difficulty_level: 1 },
  { id: 't5', subject_id: '2', name: 'Gramática', description: 'Ortografía y sintaxis', display_order: 2, difficulty_level: 2 },
  { id: 't6', subject_id: '3', name: 'Historia del Perú', description: 'Culturas y república', display_order: 1, difficulty_level: 2 },
  { id: 't7', subject_id: '4', name: 'Razonamiento Lógico', description: 'Secuencias y patrones', display_order: 1, difficulty_level: 2 },
  { id: 't8', subject_id: '5', name: 'Biología', description: 'Célula y genética', display_order: 1, difficulty_level: 2 },
]

export default function SubjectMap() {
  const { user } = useAuthStore()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSubjects(DEMO_SUBJECTS)
      setTopics(DEMO_TOPICS)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      const { data: subjectsData } = await supabase
        .from('subjects')
        .select('*')
        .order('display_order')

      const { data: topicsData } = await supabase
        .from('topics')
        .select('*')
        .order('display_order')

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user?.id || '')

      setSubjects(subjectsData || [])
      setTopics(topicsData || [])
      setProgress(progressData || [])
      setLoading(false)
    }

    fetchData()
  }, [user])

  const getTopicsForSubject = (subjectId: string) => {
    return topics.filter(t => t.subject_id === subjectId)
  }

  const getTopicProgress = () => {
    return progress.filter(p => p.status === 'completed').length
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
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-display font-bold text-gray-800">
            {selectedSubject
              ? subjects.find(s => s.id === selectedSubject)?.name
              : 'Todas las Materias'}
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {!selectedSubject ? (
          <div className="space-y-4">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className="card-hover w-full flex items-center gap-4 text-left"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.name === 'Matemáticas' && '📐'}
                  {subject.name === 'Comunicación' && '📚'}
                  {subject.name === 'Historia del Perú y Mundo' && '🌎'}
                  {subject.name === 'Razonamiento' && '🧠'}
                  {subject.name === 'Ciencias Naturales' && '🔬'}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">{subject.name}</h2>
                  <p className="text-sm text-gray-500">{subject.description}</p>
                  <div className="mt-2 progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${getTopicsForSubject(subject.id).length > 0 ? (getTopicProgress() / getTopicsForSubject(subject.id).length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedSubject(null)}
              className="text-primary-500 font-medium flex items-center gap-1 mb-4"
            >
              <ArrowLeft size={16} /> Volver a materias
            </button>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200" />

              {getTopicsForSubject(selectedSubject).map((topic, index) => {
                const isCompleted = progress.some(
                  p => p.lesson_id === topic.id && p.status === 'completed'
                )
                const isLocked = index > 0 && !progress.some(
                  p => p.lesson_id === getTopicsForSubject(selectedSubject)[index - 1].id && p.status === 'completed'
                )

                return (
                  <Link
                    key={topic.id}
                    to={isLocked ? '#' : `/topics/${topic.id}`}
                    className={`relative flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isLocked
                        ? 'opacity-50 cursor-not-allowed'
                        : 'card-hover'
                    }`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl z-10 ${
                        isCompleted
                          ? 'bg-correct'
                          : isLocked
                            ? 'bg-gray-300'
                            : 'bg-primary-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={28} />
                      ) : isLocked ? (
                        <Lock size={24} />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                      <p className="text-sm text-gray-500">{topic.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
