import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  loadSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          set({ isLoading: false })
          throw error
        }
        const user: User = {
          id: data.user?.id || '',
          name: data.user?.user_metadata?.name || email.split('@')[0],
          email: data.user?.email || email,
          role: data.user?.user_metadata?.role || 'technician',
          is_active: true,
        }
        set({ user, isAuthenticated: true, isLoading: false })
      },

      logout: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAuthenticated: false })
      },

      signUp: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        })
        set({ isLoading: false })
        if (error) throw error
      },

      loadSession: async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session?.user) {
          const u = data.session.user
          const user: User = {
            id: u.id,
            name: u.user_metadata?.name || u.email?.split('@')[0] || '',
            email: u.email || '',
            role: u.user_metadata?.role || 'technician',
            is_active: true,
          }
          set({ user, isAuthenticated: true })
        }
      },
    }),
    { name: 'eam-auth' }
  )
)
