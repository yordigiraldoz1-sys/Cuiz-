import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.put('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { username, full_name, target_career } = req.body

    const { data, error } = await supabase
      .from('profiles')
      .update({ username, full_name, target_career })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/me/statistics', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    const { data: attempts } = await supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', userId)

    const { data: exams } = await supabase
      .from('mock_exam_attempts')
      .select('*')
      .eq('user_id', userId)

    const stats = {
      lessonsCompleted: progress?.filter(p => p.status === 'completed').length || 0,
      totalExercises: attempts?.length || 0,
      correctAnswers: attempts?.filter(a => a.is_correct).length || 0,
      examsCompleted: exams?.length || 0,
      averageScore: exams?.length
        ? Math.round(exams.reduce((sum, e) => sum + (e.total_score || 0), 0) / exams.length)
        : 0,
    }

    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
