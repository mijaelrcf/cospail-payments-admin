import type { AnalyticsMonthlyPoint } from '@/types/analytics-summary'

export const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] as const

export interface MonthlyChartPoint {
  mes: string
  Ingresos: number
  'QR generados': number
  Pagados: number
}

export function buildYearOptions(currentYear: number): number[] {
  return [currentYear - 2, currentYear - 1, currentYear].filter((y) => y >= 2000)
}

export function toChartData(serieMensual: AnalyticsMonthlyPoint[]): MonthlyChartPoint[] {
  return serieMensual.map((p) => ({
    mes: MESES[p.mes - 1] ?? `M${p.mes}`,
    Ingresos: p.ingresos,
    'QR generados': p.qrGenerados,
    Pagados: p.pagados,
  }))
}
