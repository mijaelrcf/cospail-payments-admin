import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from './auth-storage'
import { ROUTES } from '../lib/routes'

export function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) return <Navigate to={ROUTES.login} replace />
  return children
}