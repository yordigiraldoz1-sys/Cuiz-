import { ArrowRight, CalendarDays, Flame, GraduationCap, Sparkles, Target, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { getGlobalCoursePerformance, type CourseProgressStatus } from '../../services/learningProgress'

interface ActivityDay {
  id: number
  level: 0 | 1 | 2 | 3 | 4
}

const ACTIVITY_DAYS: ActivityDay[] = Array.from({ length: 84 }, (_, index) => {
  const pattern = [0, 1, 0, 2, 1, 3, 0, 1, 2, 0, 4, 1, 0, 2]
  return { id: index, level: pattern[(index * 5 + Math.floor(index / 7)) % pattern.length] as ActivityDay['level'] }
})

const activityColors = ['bg-bark-100', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-500']

function StreakCard({ current, best }: { current: number; best: number }) {
  return (
    <section className="rounded-[1.75rem] border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-6 shadow-card sm:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-500">Tu racha</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="font-display text-5xl font-extrabold leading-none text-bark-800">{current}</span>
            <span className="pb-1.5 text-sm font-bold text-bark-500">días</span>
          </div>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-streak/15"><Flame className="text-streak" fill="currentColor" /></div>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white/85 px-4 py-3 text-xs font-bold text-bark-500">
        <Trophy size={17} className="text-xp" /> Mejor racha: <span className="text-bark-800">{best} días</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-bark-500">Una lección hoy mantiene tu avance encendido.</p>
    </section>
  )
}

function ActivityCard() {
  return (
    <section className="rounded-[1.75rem] border border-bark-100 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-500">Actividad</p>
          <h2 className="mt-1 font-display text-xl font-extrabold text-bark-800">Últimas 12 semanas</h2>
        </div>
        <CalendarDays size={22} className="text-bark-400" />
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5" aria-label="Mapa de actividad de las últimas 12 semanas">
          {ACTIVITY_DAYS.map((day) => <span key={day.id} className={`aspect-square min-w-0 rounded-[4px] ${activityColors[day.level]}`} title={`Nivel de actividad ${day.level}`} />)}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-end gap-1.5 text-[10px] font-bold text-bark-400">
        <span>Menos</span>
        {activityColors.map((color) => <span key={color} className={`h-2.5 w-2.5 rounded-[3px] ${color}`} />)}
        <span>Más</span>
      </div>
    </section>
  )
}

function CareerCard() {
  return (
    <section className="rounded-[1.75rem] border border-bark-100 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF1FF]"><GraduationCap className="text-[#6879D9]" /></div>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#6879D9]">Tu carrera</p>
          <h2 className="mt-1 font-display text-xl font-extrabold text-bark-800">Ingeniería de Sistemas</h2>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 divide-x divide-bark-100 rounded-2xl bg-cream-100 px-2 py-5 text-center">
        <div><p className="text-xl font-extrabold text-bark-800">30</p><p className="text-[10px] font-bold text-bark-400">Vacantes</p></div>
        <div><p className="text-xl font-extrabold text-bark-800">1200</p><p className="text-[10px] font-bold text-bark-400">Mínimo</p></div>
        <div><p className="text-xl font-extrabold text-bark-800">1600</p><p className="text-[10px] font-bold text-bark-400">Máximo</p></div>
      </div>
      <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-wide text-bark-400">Datos referenciales</p>
    </section>
  )
}

function DailyMissionCard() {
  return <section className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-primary-400 to-[#F04462] p-6 text-white shadow-[0_12px_28px_rgba(240,68,98,0.22)] sm:p-7 lg:col-span-2"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex items-center gap-2 text-white/80"><Target size={17} /><p className="text-[11px] font-extrabold uppercase tracking-[0.16em]">Tu misión de hoy</p></div><div className="mt-3 flex items-center gap-3"><span className="rounded-xl bg-white/20 px-3 py-1.5 text-[10px] font-extrabold tracking-wide">EMPIEZA</span><h2 className="truncate font-display text-2xl font-extrabold sm:text-3xl">Elige una ruta para hoy</h2></div><p className="mt-2 max-w-xl text-sm font-semibold leading-relaxed text-white/85">Escoge un curso con ruta disponible y completa una práctica breve. Pronto tus misiones se adaptarán a tus respuestas.</p></div><Link to="/courses" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-primary-600 shadow-md transition hover:-translate-y-0.5">Ver mis cursos <ArrowRight size={17} /></Link></div><div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/75"><span className="rounded-full bg-white/15 px-2 py-1">Preparación general</span><span>Elige la materia que quieres trabajar</span></div></section>
}

const globalStatus: Record<CourseProgressStatus, { label: string; className: string }> = {
  'no-data': { label: 'Sin datos', className: 'bg-bark-100 text-bark-500' },
  'no-diagnosis': { label: 'Sin diagnóstico', className: 'bg-[#EEF1FF] text-[#657FD1]' },
  reinforce: { label: 'Por reforzar', className: 'bg-primary-50 text-primary-600' },
  'in-progress': { label: 'En práctica', className: 'bg-[#FFF1DD] text-[#C88924]' },
  solid: { label: 'Avance sólido', className: 'bg-correct/10 text-correct' },
}

function GlobalPerformanceCard() {
  const courses = getGlobalCoursePerformance()
  return <section className="rounded-[1.75rem] border border-bark-100 bg-white p-6 shadow-card sm:p-7 lg:col-span-2"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary-500">Mapa global</p><h2 className="mt-1 font-display text-xl font-extrabold text-bark-800">Tu preparación completa</h2><p className="mt-1 text-sm font-semibold text-bark-500">Cada curso muestra su estado actual, sin inventar avances.</p></div><Link to="/courses" className="rounded-xl border border-bark-100 px-3 py-2 text-xs font-extrabold text-bark-600">Explorar cursos</Link></div><div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{courses.map(({ course, status }) => { const Icon = course.icon; const config = globalStatus[status]; return <Link key={course.id} to={`/courses/${course.id}`} className="flex min-w-0 items-center gap-2 rounded-xl bg-cream-50 px-3 py-2.5 transition hover:bg-primary-50"><Icon size={16} className="shrink-0 text-primary-500" /><span className="min-w-0 flex-1 truncate text-xs font-extrabold text-bark-700">{course.title}</span><span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-extrabold ${config.className}`}>{config.label}</span></Link> })}</div><Link to="/performance" className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-primary-600">Ver mapa detallado <ArrowRight size={14} /></Link></section>
}

export default function HomePage() {
  const { user } = useAuthStore()

  return (
    <div className="relative min-h-full overflow-hidden bg-cream-100 pb-28 lg:pb-12">
      <div className="pointer-events-none absolute -left-24 top-28 h-80 w-80 rounded-full bg-primary-100/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-xp/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1120px] px-4 py-5 sm:px-6 lg:px-9 lg:py-8">
        <div className="mb-7 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-xl">🐹</div>
          <span className="font-display text-xl font-extrabold text-bark-800">cuiz</span>
        </div>

        <header className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-primary-500">
            <Sparkles size={15} />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]">Tu preparación</p>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-bark-900 sm:text-4xl">Tu progreso, en un solo lugar</h1>
          <p className="mt-2 text-sm font-semibold text-bark-400">Revisa tu constancia y mantén claro el objetivo de ingreso.</p>
        </header>

        <div className="grid items-start gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <DailyMissionCard />
          <GlobalPerformanceCard />
          <StreakCard current={user?.current_streak || 0} best={user?.longest_streak || 0} />
          <ActivityCard />
          <div className="lg:col-span-2"><CareerCard /></div>
        </div>
      </div>
    </div>
  )
}
