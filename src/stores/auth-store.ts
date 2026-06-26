import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        const user: User = {
          id: '1',
          name: 'Admin',
          email,
          role: 'admin',
          is_active: true,
        }
        set({ user, isAuthenticated: true, isLoading: false })
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    { name: 'eam-auth' }
  )
)
