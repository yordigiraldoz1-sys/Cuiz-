import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabase
      .from('profiles')
      .select('total_xp, current_level, current_streak, longest_streak')
      .eq('id', userId)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/achievements', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('is_active', true)
      .order('category')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/achievements/earned', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id

    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
