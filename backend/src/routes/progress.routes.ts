import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/lessons/:lessonId/start', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { lessonId } = req.params

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        status: 'in_progress',
      }, {
        onConflict: 'user_id,lesson_id',
      })
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/lessons/:lessonId/complete', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { lessonId } = req.params
    const { score, xpEarned } = req.body

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        status: 'completed',
        best_score: score,
      }, {
        onConflict: 'user_id,lessonId',
      })
      .select()
      .single()

    if (error) throw error

    await supabase.rpc('add_xp_to_user', {
      p_user_id: userId,
      p_xp_amount: xpEarned,
    })

    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/exercises/attempt', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { exerciseId, isCorrect, userAnswer, timeSpent } = req.body

    const { data, error } = await supabase
      .from('exercise_attempts')
      .insert({
        user_id: userId,
        exercise_id: exerciseId,
        is_correct: isCorrect,
        user_answer: userAnswer,
        time_spent_seconds: timeSpent,
      })
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
