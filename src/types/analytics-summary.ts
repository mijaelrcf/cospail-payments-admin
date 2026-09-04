export interface AnalyticsPeriod {
  ingresos: number
  qrGenerados: number
  pagados: number
  conversionQrAPago: number
}

export interface AnalyticsMonthlyPoint {
  mes: number
  ingresos: number
  qrGenerados: number
  pagados: number
}

export interface AnalyticsSummary {
  fecha: string
  anio: number
  dia: AnalyticsPeriod
  mes: AnalyticsPeriod
  anioResumen: AnalyticsPeriod
  serieMensual: AnalyticsMonthlyPoint[]
}
