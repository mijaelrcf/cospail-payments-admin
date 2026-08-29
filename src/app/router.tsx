import { Navigate, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'
import { ReportPage } from '../pages/report-page'
import { RequireAuth } from './require-auth'

export const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
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