export interface User {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  target_career?: string
  current_level: number
  total_xp: number
  current_streak: number
  longest_streak: number
  last_active_date?: string
  created_at: string
}

export interface Subject {
  id: string
  name: string
  description?: string
  icon_url?: string
  color: string
  display_order: number
}

export interface Topic {
  id: string
  subject_id: string
  name: string
  description?: string
  icon_url?: string
  display_order: number
  difficulty_level: number
}

export interface Lesson {
  id: string
  topic_id: string
  title: string
  description?: string
  content?: LessonContent
  estimated_minutes: number
  display_order: number
  xp_reward: number
}

export interface LessonContent {
  theory?: string
  examples?: string[]
  tips?: string[]
}

export type ExerciseType = 'multiple_choice' | 'fill_blank' | 'drag_drop' | 'numeric' | 'true_false'

export interface Exercise {
  id: string
  lesson_id: string
  type: ExerciseType
  question: string
  question_data: QuestionData
  correct_answer: CorrectAnswer
  explanation: string
  difficulty: number
  xp_reward: number
  time_limit_seconds?: number
  display_order: number
}

export interface QuestionData {
  options?: string[]
  blanks?: number
  items?: string[]
  slots?: string[]
  placeholder?: string
}

export interface CorrectAnswer {
  value: number | boolean | string | string[] | Record<string, string>
}

export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  best_score: number
  attempts_count: number
  completed_at?: string
}

export interface ExerciseAttempt {
  id: string
  user_id: string
  exercise_id: string
  is_correct: boolean
  user_answer: unknown
  time_spent_seconds: number
  attempt_date: string
}

export interface SRCard {
  id: string
  user_id: string
  exercise_id: string
  ease_factor: number
  interval_days: number
  repetitions: number
  next_review_date: string
  last_review_date?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon_url: string
  category: 'streak' | 'xp' | 'subject' | 'exam' | 'special'
  requirement_type: string
  requirement_value: number
  xp_reward: number
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
}

export interface MockExam {
  id: string
  title: string
  description?: string
  total_questions: number
  time_limit_minutes: number
  difficulty_level: number
  subject_distribution: Record<string, number>
}

export interface MockExamAttempt {
  id: string
  user_id: string
  exam_id: string
  started_at: string
  completed_at?: string
  time_spent_seconds?: number
  total_score?: number
  subject_scores?: Record<string, number>
  answers?: ExamAnswer[]
  xp_earned: number
}

export interface ExamAnswer {
  exercise_id: string
  user_answer: unknown
  is_correct: boolean
}

export interface DailyActivity {
  id: string
  user_id: string
  activity_date: string
  xp_earned: number
  lessons_completed: number
  exercises_completed: number
  correct_answers: number
  total_answers: number
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  period_type: 'weekly' | 'monthly' | 'all_time'
  period_start: string
  xp_earned: number
  rank_position?: number
  user?: User
}
