import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('display_order')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id/topics', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', req.params.id)
      .order('display_order')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/topics/:id/lessons', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('topic_id', req.params.id)
      .order('display_order')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/lessons/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/lessons/:id/exercises', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('lesson_id', req.params.id)
      .order('display_order')

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
