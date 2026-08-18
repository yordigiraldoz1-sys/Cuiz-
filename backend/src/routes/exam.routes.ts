import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('mock_exams')
      .select('*')
      .eq('is_active', true)
      .order('difficulty_level')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('mock_exams')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/:id/submit', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { id: examId } = req.params
    const { answers, timeSpent } = req.body

    const totalCorrect = answers.filter((a: { is_correct: boolean }) => a.is_correct).length
    const totalQuestions = answers.length
    const totalScore = Math.round((totalCorrect / totalQuestions) * 100)
    const xpEarned = totalScore >= 60 ? 300 : 200

    const { data, error } = await supabase
      .from('mock_exam_attempts')
      .insert({
        user_id: userId,
        exam_id: examId,
        completed_at: new Date().toISOString(),
        time_spent_seconds: timeSpent,
        total_score: totalScore,
        answers: answers,
        xp_earned: xpEarned,
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

router.get('/attempts/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabase
      .from('mock_exam_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
