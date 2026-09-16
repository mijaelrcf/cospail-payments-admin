import { lazy } from 'react'

// Code-splitting: Panel (recharts) y Reporte se cargan solo al visitar la ruta.
export const LazyAnalyticsPage = lazy(() =>
  import('../pages/analytics-page').then((m) => ({ default: m.AnalyticsPage })),
)

export const LazyReportPage = lazy(() =>
  import('../pages/report-page').then((m) => ({ default: m.ReportPage })),
)
