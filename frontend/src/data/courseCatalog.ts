import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  BarChart3,
  BookOpenText,
  Brain,
  Calculator,
  Compass,
  Dna,
  FlaskConical,
  Globe2,
  Languages,
  Landmark,
  Lightbulb,
  Puzzle,
  Scale,
  Shapes,
  Sigma,
} from 'lucide-react'

export type CourseTone = 'coral' | 'blue' | 'amber' | 'green' | 'violet'
export type CourseStatus = 'available' | 'roadmap' | 'preparing'

export interface CourseCatalogItem {
  id: string
  title: string
  category: string
  icon: LucideIcon
  tone: CourseTone
  status: CourseStatus
}

export const COURSE_CATALOG: CourseCatalogItem[] = [
  { id: 'geometria', title: 'Geometría', category: 'Matemáticas', icon: Shapes, tone: 'coral', status: 'preparing' },
  { id: 'habilidad-matematica', title: 'Habilidad Matemática', category: 'Razonamiento', icon: Puzzle, tone: 'violet', status: 'preparing' },
  { id: 'aritmetica', title: 'Aritmética', category: 'Matemáticas', icon: Calculator, tone: 'amber', status: 'preparing' },
  { id: 'algebra', title: 'Álgebra', category: 'Matemáticas', icon: Sigma, tone: 'blue', status: 'preparing' },
  { id: 'trigonometria', title: 'Trigonometría', category: 'Matemáticas', icon: Compass, tone: 'green', status: 'preparing' },
  { id: 'fisica', title: 'Física', category: 'Ciencias', icon: Atom, tone: 'blue', status: 'preparing' },
  { id: 'quimica', title: 'Química', category: 'Ciencias', icon: FlaskConical, tone: 'green', status: 'preparing' },
  { id: 'biologia', title: 'Biología', category: 'Ciencias', icon: Dna, tone: 'green', status: 'roadmap' },
  { id: 'habilidad-verbal', title: 'Habilidad Verbal', category: 'Letras', icon: BookOpenText, tone: 'violet', status: 'preparing' },
  { id: 'lenguaje', title: 'Lenguaje', category: 'Letras', icon: Languages, tone: 'coral', status: 'roadmap' },
  { id: 'literatura', title: 'Literatura', category: 'Letras', icon: BookOpenText, tone: 'amber', status: 'roadmap' },
  { id: 'historia', title: 'Historia', category: 'Sociales', icon: Landmark, tone: 'amber', status: 'roadmap' },
  { id: 'geografia', title: 'Geografía', category: 'Sociales', icon: Globe2, tone: 'blue', status: 'roadmap' },
  { id: 'economia', title: 'Economía', category: 'Sociales', icon: BarChart3, tone: 'green', status: 'roadmap' },
  { id: 'filosofia', title: 'Filosofía', category: 'Humanidades', icon: Lightbulb, tone: 'violet', status: 'roadmap' },
  { id: 'psicologia', title: 'Psicología', category: 'Humanidades', icon: Brain, tone: 'coral', status: 'roadmap' },
  { id: 'educacion-civica', title: 'Educación Cívica', category: 'Sociales', icon: Scale, tone: 'blue', status: 'roadmap' },
]

export function getCourse(courseId?: string) {
  return COURSE_CATALOG.find((course) => course.id === courseId)
}
