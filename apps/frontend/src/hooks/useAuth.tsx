import { createContext, useContext, useState, type ReactNode } from 'react'

const AUTH_STORAGE_KEY = 'knaap_logged_in'

type AuthContextValue = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// No real backend to authenticate against yet, so "logging in" just flips
// this flag (persisted to localStorage so a refresh doesn't lose it).
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(AUTH_STORAGE_KEY) === 'true')

  function login() {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    setIsLoggedIn(true)
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
