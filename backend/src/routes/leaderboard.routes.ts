import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { period = 'weekly' } = req.query

    const now = new Date()
    let periodStart: string

    if (period === 'weekly') {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      periodStart = weekStart.toISOString().split('T')[0]
    } else if (period === 'monthly') {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    } else {
      periodStart = '2024-01-01'
    }

    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('*, user:profiles(username, avatar_url)')
      .eq('period_type', period)
      .eq('period_start', periodStart)
      .order('xp_earned', { ascending: false })
      .limit(50)

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { period = 'weekly' } = req.query

    const now = new Date()
    let periodStart: string

    if (period === 'weekly') {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - now.getDay())
      periodStart = weekStart.toISOString().split('T')[0]
    } else if (period === 'monthly') {
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    } else {
      periodStart = '2024-01-01'
    }

    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('period_type', period)
      .eq('period_start', periodStart)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    res.json(data || { rank: null, xp_earned: 0 })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
