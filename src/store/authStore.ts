// src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  expiresIn: number | null
  isAuthenticated: boolean
  login: (token: string, expiresIn: number) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      expiresIn: null,
      isAuthenticated: false,
      login: (token, expiresIn) => set({ 
        accessToken: token, 
        expiresIn, 
        isAuthenticated: true 
      }),
      logout: () => set({ 
        accessToken: null, 
        expiresIn: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
)