import { create } from 'zustand'
import { supabase } from '../services/supabase'
import type { Exercise, Lesson, UserProgress } from '../types'

interface ExerciseState {
  currentLesson: Lesson | null
  exercises: Exercise[]
  currentExerciseIndex: number
  answers: Map<string, unknown>
  sessionXP: number
  sessionCorrect: number
  sessionTotal: number
  startLesson: (lesson: Lesson, exercises: Exercise[]) => void
  submitAnswer: (exerciseId: string, answer: unknown, isCorrect: boolean) => void
  nextExercise: () => void
  completeLesson: () => Promise<UserProgress | null>
  resetSession: () => void
}

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  currentLesson: null,
  exercises: [],
  currentExerciseIndex: 0,
  answers: new Map(),
  sessionXP: 0,
  sessionCorrect: 0,
  sessionTotal: 0,

  startLesson: (lesson, exercises) => {
    set({
      currentLesson: lesson,
      exercises,
      currentExerciseIndex: 0,
      answers: new Map(),
      sessionXP: 0,
      sessionCorrect: 0,
      sessionTotal: 0,
    })
  },

  submitAnswer: (exerciseId, answer, isCorrect) => {
    const { exercises, currentExerciseIndex, sessionXP, sessionCorrect, sessionTotal } = get()
    const exercise = exercises[currentExerciseIndex]

    const newAnswers = new Map(get().answers)
    newAnswers.set(exerciseId, answer)

    set({
      answers: newAnswers,
      sessionXP: isCorrect ? sessionXP + exercise.xp_reward : sessionXP,
      sessionCorrect: isCorrect ? sessionCorrect + 1 : sessionCorrect,
      sessionTotal: sessionTotal + 1,
    })
  },

  nextExercise: () => {
    const { currentExerciseIndex, exercises } = get()
    if (currentExerciseIndex < exercises.length - 1) {
      set({ currentExerciseIndex: currentExerciseIndex + 1 })
    }
  },

  completeLesson: async () => {
    const { currentLesson, sessionXP, sessionCorrect, sessionTotal } = get()
    if (!currentLesson) return null

    const score = Math.round((sessionCorrect / sessionTotal) * 100)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        lesson_id: currentLesson.id,
        status: 'completed',
        best_score: score,
      }, {
        onConflict: 'user_id,lesson_id',
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating progress:', error)
    }

    await supabase.rpc('add_xp_to_user', {
      p_user_id: user.id,
      p_xp_amount: sessionXP,
    })

    await supabase.rpc('update_daily_activity', {
      p_user_id: user.id,
      p_xp_earned: sessionXP,
      p_lessons_completed: 1,
      p_exercises_completed: sessionTotal,
      p_correct_answers: sessionCorrect,
      p_total_answers: sessionTotal,
    })

    await supabase.rpc('update_user_streak', {
      p_user_id: user.id,
    })

    return data
  },

  resetSession: () => {
    set({
      currentLesson: null,
      exercises: [],
      currentExerciseIndex: 0,
      answers: new Map(),
      sessionXP: 0,
      sessionCorrect: 0,
      sessionTotal: 0,
    })
  },
}))
