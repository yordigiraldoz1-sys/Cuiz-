import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { createClient } from '@supabase/supabase-js'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import exerciseRoutes from './routes/exercise.routes.js'
import progressRoutes from './routes/progress.routes.js'
import gamificationRoutes from './routes/gamification.routes.js'
import examRoutes from './routes/exam.routes.js'
import leaderboardRoutes from './routes/leaderboard.routes.js'

const app = express()
const PORT = process.env.PORT || 3001

// Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/exercises', exerciseRoutes)
app.use('/api/v1/progress', progressRoutes)
app.use('/api/v1/gamification', gamificationRoutes)
app.use('/api/v1/exams', examRoutes)
app.use('/api/v1/leaderboard', leaderboardRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
