import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import { GEOMETRIA_COURSE } from '../../data/geometriaCourse'
import { COURSE_CATALOG, type CourseTone } from '../../data/courseCatalog'

const toneStyles: Record<CourseTone, { cover: string; spine: string; icon: string; shadow: string }> = {
  coral: { cover: 'from-primary-300 to-primary-500', spine: 'bg-primary-600/55', icon: 'bg-white/20 text-white', shadow: 'shadow-[0_12px_0_#D63E59,0_18px_28px_rgba(214,62,89,0.22)]' },
  blue: { cover: 'from-[#8BA9F2] to-[#657FD1]', spine: 'bg-[#4E65B2]/60', icon: 'bg-white/20 text-white', shadow: 'shadow-[0_12px_0_#5269B6,0_18px_28px_rgba(82,105,182,0.18)]' },
  amber: { cover: 'from-[#F4C66E] to-[#E6A941]', spine: 'bg-[#C88924]/60', icon: 'bg-white/20 text-white', shadow: 'shadow-[0_12px_0_#C88C2E,0_18px_28px_rgba(200,140,46,0.18)]' },
  green: { cover: 'from-[#84C99C] to-[#58A878]', spine: 'bg-[#3E8B5D]/60', icon: 'bg-white/20 text-white', shadow: 'shadow-[0_12px_0_#448F62,0_18px_28px_rgba(68,143,98,0.18)]' },
  violet: { cover: 'from-[#AD9BE7] to-[#8069C7]', spine: 'bg-[#6752AD]/60', icon: 'bg-white/20 text-white', shadow: 'shadow-[0_12px_0_#6A55B0,0_18px_28px_rgba(106,85,176,0.18)]' },
}

function readGeometryProgress() {
  const lessons = GEOMETRIA_COURSE.flatMap((unit) => unit.nodes.flatMap((node) => node.lessons.map((lesson) => ({ nodeId: node.id, lessonId: lesson.id }))))
  const completed = lessons.filter(({ nodeId, lessonId }) => {
    try {
      const saved = JSON.parse(localStorage.getItem(`completed-lessons-${nodeId}`) || '[]')
      return Array.isArray(saved) && saved.includes(lessonId)
    } catch {
      return false
    }
  }).length

  return { completed, total: lessons.length }
}

export default function CourseLibrary() {
  const navigate = useNavigate()
  const geometryProgress = useMemo(readGeometryProgress, [])
  const progressPercent = geometryProgress.total > 0 ? Math.round((geometryProgress.completed / geometryProgress.total) * 100) : 0
  const orderedCourses = useMemo(
    () => [...COURSE_CATALOG].sort((a, b) => ({ available: 2, roadmap: 1, preparing: 0 }[b.status] - { available: 2, roadmap: 1, preparing: 0 }[a.status])),
    [],
  )

  return (
    <div className="relative min-h-full overflow-hidden bg-cream-100 pb-28 lg:pb-12">
      <div className="pointer-events-none absolute -left-24 top-32 h-80 w-80 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-xp/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1240px] px-4 py-5 sm:px-6 lg:px-9 lg:py-8">
        <div className="mb-7 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-xl">🐹</div>
          <span className="font-display text-xl font-extrabold text-bark-800">cuiz</span>
        </div>

        <header className="mb-7 sm:flex sm:items-end sm:justify-between sm:gap-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary-500">
              <Sparkles size={15} />
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]">Biblioteca del postulante</p>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-bark-900 sm:text-4xl">Mis cursos</h1>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-bark-400">Abre un libro para entrar a su ruta de aprendizaje.</p>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl border border-bark-100 bg-white px-4 py-3 text-sm font-bold text-bark-400 shadow-sm sm:mt-0 sm:w-[260px]">
            <Search size={17} />
            <span>17 cursos de admisión</span>
          </div>
        </header>

        <div className="mb-7 flex items-end justify-between gap-4 border-b border-dashed border-bark-200 pb-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary-500">Biblioteca de repaso</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-bark-900">Elige un libro</h2>
          </div>
          <span className="hidden text-xs font-bold text-bark-400 sm:block">Nuevos temarios se habilitarán progresivamente</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
          {orderedCourses.map((course) => {
            const Icon = course.icon
            const tone = toneStyles[course.tone]
            const isGeometry = course.id === 'geometria'
            const isEconomy = course.id === 'economia'

            return (
              <button
                key={course.id}
                type="button"
                onClick={() => navigate(`/courses/${course.id}`)}
                className="group min-w-0 cursor-pointer text-left focus-visible:outline-none"
              >
                <div className={`relative mx-auto aspect-[4/5] w-full max-w-[175px] overflow-hidden rounded-r-[1.35rem] rounded-l-lg bg-gradient-to-br ${tone.cover} ${tone.shadow} transition-transform duration-200 group-hover:-translate-y-2 group-hover:rotate-[1deg] group-focus-visible:ring-4 group-focus-visible:ring-primary-200 ${course.status === 'preparing' ? 'saturate-[0.72]' : ''}`}>
                  <span className={`absolute inset-y-0 left-0 w-3 ${tone.spine}`} />
                  <span className="absolute inset-y-0 left-3 w-px bg-white/25" />
                  <span className="absolute right-3 top-3 h-10 w-10 rounded-full bg-white/10" />
                  <div className="relative flex h-full flex-col items-center px-5 py-6 text-center text-white sm:px-6">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 ${tone.icon}`}><Icon size={25} /></span>
                    <span className="mt-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/70">{course.category}</span>
                    <span className="mt-1 font-display text-base font-extrabold leading-tight sm:text-lg">{course.title}</span>
                    <span className="mt-auto w-full border-t border-white/20 pt-3 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/75">
                      {isGeometry ? `${geometryProgress.completed}/${geometryProgress.total} lecciones` : isEconomy ? '30 temas · ruta lista' : 'En preparación'}
                    </span>
                    {isGeometry && <span className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20"><span className="block h-full rounded-full bg-white" style={{ width: `${Math.max(progressPercent, 3)}%` }} /></span>}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
