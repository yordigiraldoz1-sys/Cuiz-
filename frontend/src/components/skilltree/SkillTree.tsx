import { useEffect, useMemo, useRef } from 'react'
import { BookOpen, Check, ChevronRight, Layers, Lock, MoreHorizontal, Play } from 'lucide-react'
import type { SkillUnit } from '../../data/geometriaCourse'
import { getTopicStatus } from '../../services/learningProgress'

interface SkillTreeProps {
  units: SkillUnit[]
  completedNodes: string[]
  currentNodeId: string | null
  onLessonClick: (nodeId: string, lessonId: string) => void
  focusedUnitId?: string
  onOpenSectionResource?: (sectionId: string, view: 'summary' | 'flashcards' | 'more') => void
  unitLabel?: string
  interactive?: boolean
  showSectionResources?: boolean
  sectionResourcesEnabled?: boolean
  interactiveNodeIds?: string[]
}

type NodeState = 'locked' | 'available' | 'current' | 'completed'

function readCompletedLessons(nodeId: string, validLessons: string[]) {
  try {
    const saved = JSON.parse(localStorage.getItem(`completed-lessons-${nodeId}`) || '[]')
    if (!Array.isArray(saved)) return 0
    return validLessons.filter((lessonId) => saved.includes(lessonId)).length
  } catch {
    return 0
  }
}

export default function SkillTree({ units, completedNodes, currentNodeId, onLessonClick, focusedUnitId, onOpenSectionResource, unitLabel = 'Sección', interactive = true, showSectionResources = Boolean(onOpenSectionResource), sectionResourcesEnabled = true, interactiveNodeIds }: SkillTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const allNodes = useMemo(() => units.flatMap((unit) => unit.nodes), [units])

  const getNodeState = (nodeId: string, index: number): NodeState => {
    if (completedNodes.includes(nodeId)) return 'completed'
    if (nodeId === currentNodeId) return 'current'
    if (index === 0 || completedNodes.includes(allNodes[index - 1]?.id)) return 'available'
    return 'locked'
  }

  useEffect(() => {
    if (focusedUnitId || !currentNodeId || !containerRef.current) return
    const currentIndex = allNodes.findIndex((node) => node.id === currentNodeId)
    if (currentIndex <= 0) return
    document.getElementById(`node-${currentNodeId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [allNodes, currentNodeId, focusedUnitId])

  useEffect(() => {
    if (!focusedUnitId) return
    document.getElementById(`section-${focusedUnitId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focusedUnitId])

  const getOffset = (index: number) => {
    const pattern = [0, -64, 18, 70, 24, -56, -18, 58]
    return pattern[index % pattern.length]
  }

  const handleNodeClick = (nodeId: string) => {
    const node = allNodes.find((item) => item.id === nodeId)
    if (!node?.lessons.length) return

    let completed: string[] = []
    try {
      const saved = JSON.parse(localStorage.getItem(`completed-lessons-${nodeId}`) || '[]')
      completed = Array.isArray(saved) ? saved : []
    } catch {
      completed = []
    }

    const nextLesson = node.lessons.find((lesson) => !completed.includes(lesson.id)) || node.lessons[0]
    onLessonClick(nodeId, nextLesson.id)
  }

  return (
    <div ref={containerRef} className="w-full">
      {units.map((unit, unitIndex) => {
        const completedInUnit = unit.nodes.filter((node) => completedNodes.includes(node.id)).length
        const unitLessonCount = unit.nodes.reduce((total, node) => total + node.lessons.length, 0)
        const completedLessonsInUnit = unit.nodes.reduce(
          (total, node) => total + readCompletedLessons(node.id, node.lessons.map((lesson) => lesson.id)),
          0,
        )
        const unitProgress = unitLessonCount > 0 ? Math.round((completedLessonsInUnit / unitLessonCount) * 100) : 0

        return (
          <section id={`section-${unit.id}`} key={unit.id} className="mb-10 scroll-mt-24 last:mb-0">
            <div className={`relative mb-5 overflow-hidden rounded-[1.75rem] bg-gradient-to-r ${unit.color} px-5 py-5 text-white shadow-[0_12px_30px_rgba(238,64,91,0.18)] sm:px-6`}>
              <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10" />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/20 text-2xl shadow-inner">{unit.icon}</span>
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/80">{unitLabel} {unitIndex + 1}</p>
                  <h2 className="truncate font-display text-xl font-extrabold">{unit.title}</h2>
                  <p className="truncate text-xs font-semibold text-white/85">{unit.subtitle.replace(/^Unidad \d+\s*-\s*/i, '')}</p>
                </div>
              </div>
                <div className="shrink-0 rounded-2xl border border-white/15 bg-white/20 px-3 py-2 text-center backdrop-blur-sm">
                  <p className="text-sm font-extrabold">{completedInUnit}/{unit.nodes.length}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-white/75">temas</p>
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${unitProgress}%` }} />
                </div>
                <span className="text-[11px] font-extrabold text-white/90">{completedLessonsInUnit}/{unitLessonCount} lecciones</span>
              </div>
              {showSectionResources && <div className="relative mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <button type="button" disabled={!sectionResourcesEnabled} onClick={() => onOpenSectionResource?.(unit.id, 'summary')} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-xs font-extrabold text-white transition enabled:hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"><BookOpen size={14} />Resumen</button>
                <button type="button" disabled={!sectionResourcesEnabled} onClick={() => onOpenSectionResource?.(unit.id, 'flashcards')} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-xs font-extrabold text-white transition enabled:hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"><Layers size={14} />Flashcards</button>
                <button type="button" disabled={!sectionResourcesEnabled} onClick={() => onOpenSectionResource?.(unit.id, 'more')} className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/15 px-3 py-2 text-xs font-extrabold text-white transition enabled:hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60 sm:col-auto"><MoreHorizontal size={16} />Más recursos</button>
              </div>}
            </div>

            <div className="relative mx-auto max-w-[700px] overflow-hidden rounded-[1.75rem] border border-bark-100/70 bg-white/55 px-3 py-4 shadow-[0_10px_35px_rgba(61,43,31,0.035)] backdrop-blur-sm sm:px-8">
              {unit.nodes.map((node) => {
                const globalIndex = allNodes.findIndex((item) => item.id === node.id)
                const state = getNodeState(node.id, globalIndex)
                const completedLessons = readCompletedLessons(node.id, node.lessons.map((lesson) => lesson.id))
                const learningStatus = completedNodes.includes(node.id) ? 'completed' : getTopicStatus(node.id)
                const nodeInteractive = interactive && (!interactiveNodeIds || interactiveNodeIds.includes(node.id))
                const offset = getOffset(globalIndex)
                const nodeButton = state === 'locked'
                  ? 'border-[#DDD1C8] bg-[#F4ECE5] text-bark-400 shadow-[0_5px_0_#DED2C8]'
                  : learningStatus === 'mastered'
                    ? 'border-correct bg-correct text-white shadow-[0_6px_0_#31975B]'
                    : learningStatus === 'completed'
                      ? 'border-[#657FD1] bg-[#8BA9F2] text-white shadow-[0_6px_0_#5269B6]'
                      : learningStatus === 'in-progress'
                        ? 'border-[#E99A4F] bg-[#F4C66E] text-white shadow-[0_6px_0_#C88C2E]'
                        : state === 'current'
                  ? 'border-primary-400 bg-primary-400 text-white shadow-[0_7px_0_#D93A55,0_10px_24px_rgba(255,91,112,0.32)]'
                  : state === 'available'
                      ? 'border-primary-300 bg-white text-bark-700 shadow-[0_6px_0_#F6C4CB] hover:-translate-y-1'
                      : 'border-[#DDD1C8] bg-[#F4ECE5] text-bark-400 shadow-[0_5px_0_#DED2C8]'
                const statusLabel = learningStatus === 'mastered' ? 'Dominado' : learningStatus === 'completed' ? 'Completado' : learningStatus === 'in-progress' ? 'En práctica' : state === 'current' ? 'Continuar' : 'Disponible'

                return (
                  <div key={node.id} className="relative z-10 flex h-[112px] items-center justify-center">
                    <div id={`node-${node.id}`} className="flex w-[390px] max-w-full items-center gap-4 transition-transform sm:translate-x-[var(--node-offset)]" style={{ '--node-offset': `${offset}px` } as React.CSSProperties}>
                      <button type="button" onClick={() => nodeInteractive && state !== 'locked' && handleNodeClick(node.id)} disabled={!nodeInteractive || state === 'locked'} className={`flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border-[4px] text-2xl transition-all duration-200 ${nodeButton}`} aria-label={`${node.title}, ${completedLessons} de ${node.lessons.length} lecciones`}>
                        {state === 'locked' && <Lock size={21} />}
                        {state === 'completed' && <Check size={27} strokeWidth={3} />}
                        {(state === 'current' || state === 'available') && <span>{node.icon}</span>}
                      </button>

                      <button type="button" onClick={() => nodeInteractive && state !== 'locked' && handleNodeClick(node.id)} disabled={!nodeInteractive || state === 'locked'} className={`min-w-0 flex-1 rounded-2xl px-1 py-2 text-left ${!nodeInteractive || state === 'locked' ? 'cursor-not-allowed' : 'group cursor-pointer'}`}>
                        <div className="flex items-center gap-2">
                          <h3 className={`truncate text-sm font-extrabold ${state === 'locked' ? 'text-bark-400' : 'text-bark-800'}`}>{node.title}</h3>
                          {nodeInteractive && state !== 'locked' && <ChevronRight size={15} className="shrink-0 text-primary-400 transition-transform group-hover:translate-x-1" />}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex gap-1" aria-hidden="true">
                            {node.lessons.map((lesson, lessonIndex) => (
                              <span key={lesson.id} className={`h-1.5 w-5 rounded-full ${lessonIndex < completedLessons ? 'bg-primary-400' : state === 'locked' ? 'bg-bark-100' : 'bg-primary-100'}`} />
                            ))}
                          </div>
                          <span className={`text-[11px] font-bold ${state === 'locked' ? 'text-bark-300' : 'text-bark-500'}`}>{completedLessons}/{node.lessons.length}</span>
                          {state !== 'locked' && <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${!nodeInteractive ? 'bg-bark-100 text-bark-400' : learningStatus === 'mastered' ? 'bg-correct/10 text-correct' : learningStatus === 'completed' ? 'bg-[#EEF1FF] text-[#657FD1]' : learningStatus === 'in-progress' ? 'bg-[#FFF1DD] text-[#C88924]' : 'bg-primary-50 text-primary-500'}`}>{nodeInteractive && (learningStatus === 'mastered' ? <Check size={10} strokeWidth={3} /> : <Play size={9} fill="currentColor" />)}{nodeInteractive ? statusLabel : 'Próximamente'}</span>}
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
