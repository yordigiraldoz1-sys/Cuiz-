import { Check, ChevronRight, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COURSE_CATALOG } from '../../data/courseCatalog'

interface CourseListProps {
  currentCourseId: string
  onSelect?: () => void
}

function CourseList({ currentCourseId, onSelect }: CourseListProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-1.5">
      {COURSE_CATALOG.map((course) => {
        const Icon = course.icon
        const isCurrent = course.id === currentCourseId

        return (
          <button
            key={course.id}
            type="button"
            onClick={() => {
              if (!isCurrent) navigate(`/courses/${course.id}`)
              onSelect?.()
            }}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${isCurrent ? 'bg-primary-50 text-primary-600' : 'text-bark-600 hover:bg-cream-100'}`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isCurrent ? 'bg-primary-100' : 'bg-bark-50'}`}><Icon size={18} /></span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-sm font-extrabold ${isCurrent ? 'text-primary-600' : 'text-bark-700'}`}>{course.title}</span>
              <span className={`block text-[10px] font-bold ${isCurrent ? 'text-primary-400' : 'text-bark-400'}`}>{course.status === 'available' ? 'En curso' : 'En preparación'}</span>
            </span>
            {isCurrent ? <Check size={18} strokeWidth={3} /> : <ChevronRight size={16} className="text-bark-300" />}
          </button>
        )
      })}
    </div>
  )
}

export function DesktopCourseSwitcher({ currentCourseId }: { currentCourseId: string }) {
  return (
    <aside className="sticky top-7 hidden max-h-[calc(100vh-4rem)] xl:block">
      <div className="overflow-hidden rounded-[1.65rem] border border-bark-100 bg-white p-3 shadow-card">
        <div className="border-b border-bark-100 px-2 pb-3 pt-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-primary-500">Explora</p>
          <h2 className="mt-1 font-display text-lg font-extrabold text-bark-800">Cambiar curso</h2>
        </div>
        <div className="mt-2 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1 [scrollbar-color:#FFC1CB_transparent] [scrollbar-width:thin]">
          <CourseList currentCourseId={currentCourseId} />
        </div>
      </div>
    </aside>
  )
}

export function MobileCourseSwitcher({ currentCourseId, open, onClose }: { currentCourseId: string; open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label="Cambiar curso">
      <button type="button" aria-label="Cerrar selector de cursos" onClick={onClose} className="absolute inset-0 bg-bark-900/30 backdrop-blur-[2px]" />
      <section className="absolute inset-x-0 bottom-0 max-h-[78vh] rounded-t-[2rem] bg-white px-5 pb-8 pt-3 shadow-[0_-12px_30px_rgba(61,43,31,0.18)]">
        <div className="mx-auto h-1.5 w-12 rounded-full bg-bark-100" />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-primary-500">Biblioteca</p>
            <h2 className="mt-1 font-display text-xl font-extrabold text-bark-800">Cambiar curso</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-bark-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300" aria-label="Cerrar"><X size={20} /></button>
        </div>
        <div className="mt-4 max-h-[58vh] overflow-y-auto pr-1"><CourseList currentCourseId={currentCourseId} onSelect={onClose} /></div>
      </section>
    </div>
  )
}
