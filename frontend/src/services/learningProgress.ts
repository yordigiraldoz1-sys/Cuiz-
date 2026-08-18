import { GEOMETRIA_STAGE } from '../data/geometriaCourse'
import { COURSE_CATALOG, type CourseCatalogItem } from '../data/courseCatalog'

const ATTEMPTS_KEY = 'cuiz-learning-attempts'

export type MissionKind = 'continue' | 'reinforce' | 'review'
export type TopicStatus = 'available' | 'in-progress' | 'completed' | 'mastered'

export interface LearningAttempt { id: string; courseId: string; nodeId: string; lessonId: string; questionId: string; correct: boolean; answeredAt: string; nextReviewAt: string }
export interface LearningRecommendation { kind: MissionKind; label: string; title: string; description: string; href: string; nodeId: string; lessonId: string }
export interface TopicPerformance { nodeId: string; title: string; total: number; correct: number; accuracy: number; sectionId: string; lessonId: string; status: TopicStatus }
export type CourseProgressStatus = 'no-data' | 'no-diagnosis' | 'reinforce' | 'in-progress' | 'solid'
export interface CoursePerformance { course: CourseCatalogItem; status: CourseProgressStatus }

function readAttempts(): LearningAttempt[] { if (typeof window === 'undefined') return []; try { const parsed = JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || '[]'); return Array.isArray(parsed) ? parsed.map((attempt) => ({ courseId: 'geometria', ...attempt })) : [] } catch { return [] } }
function readCompletedLessons(nodeId: string): string[] { if (typeof window === 'undefined') return []; try { const parsed = JSON.parse(localStorage.getItem(`completed-lessons-${nodeId}`) || '[]'); return Array.isArray(parsed) ? parsed : [] } catch { return [] } }

function latestAnswersForTopic(nodeId: string) {
  const latest = new Map<string, LearningAttempt>()
  readAttempts().filter((attempt) => attempt.courseId === 'geometria' && attempt.nodeId === nodeId).forEach((attempt) => { const previous = latest.get(attempt.questionId); if (!previous || previous.answeredAt < attempt.answeredAt) latest.set(attempt.questionId, attempt) })
  return [...latest.values()].sort((a, b) => b.answeredAt.localeCompare(a.answeredAt)).slice(0, 5)
}

export function getTopicStatus(nodeId: string): TopicStatus {
  const node = GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes).find((item) => item.id === nodeId)
  if (!node) return 'available'
  const latest = latestAnswersForTopic(nodeId)
  const accuracy = latest.length ? latest.filter((attempt) => attempt.correct).length / latest.length : 0
  if (latest.length >= 3 && accuracy >= 0.8) return 'mastered'
  if (readCompletedLessons(nodeId).length >= node.lessons.length) return 'completed'
  if (latest.length > 0 || readCompletedLessons(nodeId).length > 0) return 'in-progress'
  return 'available'
}

export function getGeometryPerformance(includeUntouched = false): TopicPerformance[] {
  return GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes.map((node) => {
    const latest = latestAnswersForTopic(node.id)
    const correct = latest.filter((attempt) => attempt.correct).length
    return { nodeId: node.id, title: node.title, total: latest.length, correct, accuracy: latest.length ? Math.round((correct / latest.length) * 100) : 0, sectionId: section.id, lessonId: node.lessons[0]?.id || '', status: getTopicStatus(node.id) }
  })).filter((topic) => includeUntouched || topic.total > 0 || topic.status !== 'available')
}

export function getGeometryLearningSummary() {
  const all = getGeometryPerformance(true)
  return { mastered: all.filter((topic) => topic.status === 'mastered').length, inProgress: all.filter((topic) => topic.status === 'in-progress' || topic.status === 'completed').length, reinforce: all.filter((topic) => topic.status === 'in-progress' && topic.accuracy < 80).length }
}

export function getCourseProgressStatus(course: CourseCatalogItem): CourseProgressStatus {
  if (course.status !== 'available') return 'no-data'
  const topics = getGeometryPerformance()
  if (!topics.length) return 'no-diagnosis'
  const needsReinforcement = topics.some((topic) => topic.status === 'in-progress' && topic.accuracy < 80)
  if (needsReinforcement) return 'reinforce'
  if (topics.some((topic) => topic.status === 'mastered')) return 'solid'
  return 'in-progress'
}

export function getGlobalCoursePerformance(): CoursePerformance[] {
  return COURSE_CATALOG.map((course) => ({ course, status: getCourseProgressStatus(course) }))
}

export function recordLearningAttempt(input: Omit<LearningAttempt, 'id' | 'courseId' | 'answeredAt' | 'nextReviewAt'> & { courseId?: string }) {
  if (typeof window === 'undefined') return
  const all = readAttempts(); const previous = [...all].reverse().find((attempt) => attempt.nodeId === input.nodeId && attempt.questionId === input.questionId)
  const now = new Date(); const nextReview = new Date(now)
  nextReview.setDate(nextReview.getDate() + (input.correct ? (previous && !previous.correct ? 3 : 7) : 1))
  const attempt: LearningAttempt = { ...input, courseId: input.courseId || 'geometria', id: `${input.questionId}-${now.getTime()}`, answeredAt: now.toISOString(), nextReviewAt: nextReview.toISOString() }
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify([...all, attempt].slice(-500)))
}

export function getWeakTopicCount() { return getGeometryPerformance().filter((topic) => topic.status === 'in-progress' && topic.accuracy < 80).length }

function currentNode() { const nodes = GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes); return nodes.find((node) => readCompletedLessons(node.id).length < node.lessons.length) || nodes[0] }

export function getGeometryRecommendation(): LearningRecommendation {
  const nodes = GEOMETRIA_STAGE.sections.flatMap((section) => section.nodes); const now = Date.now()
  const due = readAttempts().filter((attempt) => attempt.courseId === 'geometria' && !attempt.correct && new Date(attempt.nextReviewAt).getTime() <= now).sort((a, b) => b.answeredAt.localeCompare(a.answeredAt))[0]
  const weakTopic = getGeometryPerformance().filter((topic) => topic.status === 'in-progress' && topic.accuracy < 80).sort((a, b) => a.accuracy - b.accuracy)[0]
  const target = nodes.find((node) => node.id === (due?.nodeId || weakTopic?.nodeId)) || currentNode(); const lesson = target?.lessons.find((item) => !readCompletedLessons(target.id).includes(item.id)) || target?.lessons[0]
  if (!target || !lesson) return { kind: 'review', label: 'REPASA', title: 'Mantén tus conceptos activos', description: 'Vuelve a tu curso para escoger una práctica breve.', href: '/courses/geometria', nodeId: '', lessonId: '' }
  if (due || weakTopic) return { kind: 'reinforce', label: 'REFUERZA', title: target.title, description: 'Este tema necesita una práctica corta antes de seguir avanzando.', href: `/learn/${target.id}/${lesson.id}`, nodeId: target.id, lessonId: lesson.id }
  return { kind: 'continue', label: 'CONTINÚA', title: lesson.title, description: 'Una práctica breve para avanzar sin perder el hilo.', href: `/learn/${target.id}/${lesson.id}`, nodeId: target.id, lessonId: lesson.id }
}
