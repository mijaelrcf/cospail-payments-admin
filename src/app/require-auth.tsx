import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from './auth-storage'

export function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/" replace />
  return children
}