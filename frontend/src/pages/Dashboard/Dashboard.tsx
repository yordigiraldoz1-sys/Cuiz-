import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SkillTree from '../../components/skilltree/SkillTree'
import { CourseResourcesDialog, GeometryToolbar, type SectionResourceView } from '../../components/geometry/GeometryNavigator'
import { getCourse, type CourseCatalogItem } from '../../data/courseCatalog'
import { GEOMETRIA_RESOURCES, GEOMETRIA_STAGE } from '../../data/geometriaCourse'
import { ECONOMIA_STAGE } from '../../data/economiaCourse'

const SECTION_STORAGE_KEY = 'last-section-geometria'
const validSection = (id: string | null | undefined) => GEOMETRIA_STAGE.sections.some((section) => section.id === id)

function readCompletedNodes() { return GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes).filter((node) => { try { const saved = JSON.parse(localStorage.getItem(`completed-lessons-${node.id}`) || '[]'); return Array.isArray(saved) && node.lessons.every((lesson) => saved.includes(lesson.id)) } catch { return false } }).map((node) => node.id) }
function readCompletedEconomyNodes() { return ECONOMIA_STAGE.sections.flatMap((section) => section.nodes).filter((node) => { try { const saved = JSON.parse(localStorage.getItem(`completed-lessons-${node.id}`) || '[]'); return Array.isArray(saved) && node.lessons.every((lesson) => saved.includes(lesson.id)) } catch { return false } }).map((node) => node.id) }

function TreeHeader({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) { return <header className="mb-6"><Link to="/courses" className="mb-3 inline-flex items-center gap-1.5 rounded-xl px-1 py-1 text-sm font-extrabold text-bark-500 transition-colors hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"><ArrowLeft size={17} />Mis cursos</Link><div className="mb-2 flex items-center gap-2 text-primary-500"><Sparkles size={15} /><p className="text-[11px] font-extrabold uppercase tracking-[0.16em]">{eyebrow}</p></div><h1 className="font-display text-2xl font-extrabold text-bark-900 sm:text-3xl">{title}</h1><p className="mt-1 max-w-2xl text-sm font-semibold text-bark-400">{description}</p></header> }

function GeometryTree() {
  const navigate = useNavigate(); const [searchParams] = useSearchParams()
  const [completedNodes, setCompletedNodes] = useState<string[]>(readCompletedNodes)
  const allNodes = useMemo(() => GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes), [])
  const currentNodeId = allNodes.find((node, index) => !completedNodes.includes(node.id) && (index === 0 || completedNodes.includes(allNodes[index - 1].id)))?.id || null
  const currentSectionId = GEOMETRIA_STAGE.sections.find((section) => section.nodes.some((node) => node.id === currentNodeId))?.id || GEOMETRIA_STAGE.sections[0].id
  const [selectedSectionId, setSelectedSectionId] = useState(() => { const query = searchParams.get('section'); const saved = localStorage.getItem(SECTION_STORAGE_KEY); if (validSection(query)) return query as string; if (validSection(saved)) return saved as string; return currentSectionId })
  const [resourceDialog, setResourceDialog] = useState<{ sectionId: string; view: SectionResourceView } | null>(null)
  const activeResourceSection = GEOMETRIA_STAGE.sections.find((section) => section.id === resourceDialog?.sectionId) || null

  useEffect(() => { const refresh = () => setCompletedNodes(readCompletedNodes()); window.addEventListener('focus', refresh); window.addEventListener('storage', refresh); return () => { window.removeEventListener('focus', refresh); window.removeEventListener('storage', refresh) } }, [])
  useEffect(() => { if (validSection(selectedSectionId)) localStorage.setItem(SECTION_STORAGE_KEY, selectedSectionId) }, [selectedSectionId])
  const selectSection = (sectionId: string) => { if (!validSection(sectionId)) return; setSelectedSectionId(sectionId); localStorage.setItem(SECTION_STORAGE_KEY, sectionId); navigate(`/courses/geometria?section=${encodeURIComponent(sectionId)}`, { replace: true }) }

  return <><main className="min-w-0"><TreeHeader title="Geometría" eyebrow="Etapa 1 · Fundamentos de geometría" description={GEOMETRIA_STAGE.subtitle} /><GeometryToolbar stage={GEOMETRIA_STAGE} sections={GEOMETRIA_STAGE.sections} selectedSectionId={selectedSectionId} onSectionSelect={selectSection} onOpenPerformance={() => navigate('/courses/geometria/performance')} /><div className="mx-auto max-w-[1120px]"><SkillTree units={GEOMETRIA_STAGE.sections} completedNodes={completedNodes} currentNodeId={currentNodeId} focusedUnitId={selectedSectionId} onLessonClick={(nodeId, lessonId) => navigate(`/learn/${nodeId}/${lessonId}`)} onOpenSectionResource={(sectionId, view) => setResourceDialog({ sectionId, view })} /></div></main><CourseResourcesDialog section={activeResourceSection} resources={GEOMETRIA_RESOURCES} view={resourceDialog?.view || null} onClose={() => setResourceDialog(null)} onOpenSyllabus={() => { setResourceDialog(null); navigate('/courses/geometria/syllabus') }} /></>
}

function PreparingCourseTree({ course }: { course: CourseCatalogItem }) { const Icon = course.icon; return <main className="min-w-0"><TreeHeader title={course.title} eyebrow="Ruta de aprendizaje" description="Pronto tendrás aquí una ruta hecha para avanzar con claridad." /><section className="relative mx-auto max-w-[760px] overflow-hidden rounded-[2rem] border border-bark-100 bg-white px-6 py-12 text-center shadow-card sm:px-12 sm:py-16"><div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-primary-100 text-primary-500"><Icon size={37} /></div><p className="relative mt-7 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary-500">Árbol en preparación</p><h2 className="relative mt-2 font-display text-2xl font-extrabold text-bark-900 sm:text-3xl">Estamos preparando {course.title}</h2><p className="relative mx-auto mt-4 max-w-md text-sm font-semibold leading-relaxed text-bark-400">Estamos organizando un temario progresivo, con lecciones cortas, práctica cercana y una ruta clara para tu preparación.</p><Link to="/courses" className="relative mt-8 inline-flex rounded-2xl bg-primary-500 px-5 py-3 text-sm font-extrabold text-white shadow-md">Explorar mis cursos</Link></section></main> }

function EconomyRoadmap() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [completedNodes, setCompletedNodes] = useState<string[]>(readCompletedEconomyNodes)
  const validUnit = (id: string | null) => ECONOMIA_STAGE.sections.some((unit) => unit.id === id)
  const [selectedUnitId, setSelectedUnitId] = useState(() => {
    const query = searchParams.get('section')
    if (validUnit(query)) return query as string
    return ECONOMIA_STAGE.sections[0].id
  })
  const selectUnit = (unitId: string) => {
    if (!validUnit(unitId)) return
    setSelectedUnitId(unitId)
    localStorage.setItem('last-section-economia', unitId)
    navigate(`/courses/economia?section=${encodeURIComponent(unitId)}`, { replace: true })
  }

  useEffect(() => {
    const refresh = () => setCompletedNodes(readCompletedEconomyNodes())
    window.addEventListener('focus', refresh)
    window.addEventListener('storage', refresh)
    return () => { window.removeEventListener('focus', refresh); window.removeEventListener('storage', refresh) }
  }, [])
  const allNodes = ECONOMIA_STAGE.sections.flatMap((section) => section.nodes)
  const currentNodeId = allNodes.find((node, index) => !completedNodes.includes(node.id) && (index === 0 || completedNodes.includes(allNodes[index - 1].id)))?.id || null

  return <main className="min-w-0"><TreeHeader title="Economía" eyebrow="Etapa 1 · Economía anual" description={ECONOMIA_STAGE.subtitle} /><GeometryToolbar stage={ECONOMIA_STAGE} sections={ECONOMIA_STAGE.sections} selectedSectionId={selectedUnitId} onSectionSelect={selectUnit} courseName="Economía" sectionLabel="Unidad" /><div className="mx-auto max-w-[1120px]"><SkillTree units={ECONOMIA_STAGE.sections} completedNodes={completedNodes} currentNodeId={currentNodeId} focusedUnitId={selectedUnitId} onLessonClick={(nodeId, lessonId) => navigate(`/learn/${nodeId}/${lessonId}`)} unitLabel="Unidad" interactiveNodeIds={['eco-ciencia']} showSectionResources sectionResourcesEnabled={false} /></div></main>
}

export default function Dashboard() { const { courseId } = useParams(); const course = getCourse(courseId); if (!course) return <Navigate to="/courses" replace />; return <div className="relative min-h-full overflow-hidden bg-cream-100 pb-8"><div className="relative mx-auto max-w-[1360px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">{course.id === 'geometria' ? <GeometryTree /> : course.id === 'economia' ? <EconomyRoadmap /> : <PreparingCourseTree course={course} />}</div></div> }
