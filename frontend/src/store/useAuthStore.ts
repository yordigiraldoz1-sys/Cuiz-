import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '../services/supabase'
import type { User } from '../types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, username: string) => Promise<void>
  logout: () => Promise<void>
  fetchProfile: () => Promise<void>
  enterDemoMode: () => void
}

const DEMO_USER: User = {
  id: 'demo-user-id',
  email: 'demo@cuiz.com',
  username: 'EstudianteDemo',
  full_name: 'Demo',
  current_level: 5,
  total_xp: 2500,
  current_streak: 7,
  longest_streak: 14,
  created_at: new Date().toISOString(),
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),

  enterDemoMode: () => {
    set({ user: DEMO_USER, loading: false })
  },

  login: async (email, password) => {
    if (!isSupabaseConfigured) {
      set({ user: DEMO_USER })
      return
    }

    try {
      set({ error: null })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      set({ user: profile })
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  register: async (email, password, username) => {
    if (!isSupabaseConfigured) {
      set({ user: { ...DEMO_USER, username, email } })
      return
    }

    try {
      set({ error: null })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      })
      if (error) throw error

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()

        set({ user: profile })
      }
    } catch (error) {
      set({ error: (error as Error).message })
      throw error
    }
  },

  logout: async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    set({ user: null })
  },

  fetchProfile: async () => {
    if (!isSupabaseConfigured) {
      set({ loading: false })
      return
    }

    try {
      set({ loading: true })
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        set({ loading: false })
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      set({ user: profile, loading: false })
    } catch (error) {
      set({ loading: false, error: (error as Error).message })
    }
  },
}))
