import { Router, Request, Response } from 'express'
import { supabase } from '../app.js'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    if (error) throw error

    res.json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    res.json({ user: data.user, session: data.session })
  } catch (error) {
    res.status(401).json({ error: (error as Error).message })
  }
})

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
