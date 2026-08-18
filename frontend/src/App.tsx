import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseLibrary from './pages/Courses/CourseLibrary'
import HomePage from './pages/Home/HomePage'
import ExerciseSession from './pages/Learning/ExerciseSession'
import LessonPage from './pages/Learning/LessonPage'
import SpacedRepetition from './pages/Review/SpacedRepetition'
import PerformancePage from './pages/Review/PerformancePage'
import ExamList from './pages/MockExam/ExamList'
import ExamSession from './pages/MockExam/ExamSession'
import ExamResults from './pages/MockExam/ExamResults'
import Profile from './pages/Profile/Profile'
import Achievements from './pages/Profile/Achievements'
import Leaderboard from './pages/Leaderboard/Leaderboard'

import LoadingSpinner from './components/common/LoadingSpinner'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore()

  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/" replace />

  return <>{children}</>
}

export default function App() {
  const { fetchProfile } = useAuthStore()

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CourseLibrary />} />
            <Route path="/courses/geometria/syllabus" element={<Navigate to="/courses/geometria" replace />} />
            <Route path="/courses/geometria/performance" element={<Navigate to="/courses/geometria" replace />} />
            <Route path="/courses/:courseId" element={<Dashboard />} />
            <Route path="/review" element={<SpacedRepetition />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/exams" element={<ExamList />} />
            <Route path="/exams/:examId" element={<ExamSession />} />
            <Route path="/exams/:examId/results/:attemptId" element={<ExamResults />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/learn/:nodeId/:lessonId" element={<LessonPage />} />
          </Route>

          <Route path="/lessons/:lessonId/exercises" element={<ProtectedRoute><ExerciseSession /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </QueryClientProvider>
  )
}
