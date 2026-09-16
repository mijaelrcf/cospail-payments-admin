import { Navigate, createBrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages/login-page'
import { NotFoundPage } from '../pages/not-found-page'
import { RequireAuth } from './require-auth'
import { RouteBoundary } from './route-boundary'
import { LazyAnalyticsPage, LazyReportPage } from './lazy-pages'
import { ROUTES } from '../lib/routes'

export const router = createBrowserRouter([
  {
    path: ROUTES.login,
    element: (
      <RouteBoundary>
        <LoginPage />
      </RouteBoundary>
    ),
  },
  {
    path: ROUTES.panel,
    element: (
      <RouteBoundary>
        <RequireAuth>
          <LazyAnalyticsPage />
        </RequireAuth>
      </RouteBoundary>
    ),
  },
  // Compatibilidad: /dashboard redirige a /panel
  { path: ROUTES.dashboardLegacy, element: <Navigate to={ROUTES.panel} replace /> },
  {
    path: ROUTES.reporte,
    element: (
      <RouteBoundary>
        <RequireAuth>
          <LazyReportPage />
        </RequireAuth>
      </RouteBoundary>
    ),
  },
  {
    path: '*',
    element: (
      <RouteBoundary>
        <NotFoundPage />
      </RouteBoundary>
    ),
  },
])
