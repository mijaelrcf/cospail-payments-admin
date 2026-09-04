import { Navigate, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'
import { ReportPage } from '../pages/report-page'
import { AnalyticsPage } from '../pages/analytics-page'
import { RequireAuth } from './require-auth'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    path: '/dashboard',
    element: (
      <RequireAuth>
        <AnalyticsPage />
      </RequireAuth>
    ),
  },
  {
    path: '/reporte',
    element: (
      <RequireAuth>
        <ReportPage />
      </RequireAuth>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
])