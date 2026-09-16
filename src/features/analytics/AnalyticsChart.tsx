import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardSubtitle, CardTitle } from '@/components/ui/Card'
import type { MonthlyChartPoint } from './analytics-utils'

interface AnalyticsChartProps {
  year: number
  data: MonthlyChartPoint[]
}

export function AnalyticsChart({ year, data }: AnalyticsChartProps) {
  return (
    <Card>
      <CardTitle>Serie mensual {year}</CardTitle>
      <CardSubtitle>Comparativa mes a mes de ingresos, QR generados y pagos.</CardSubtitle>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ingresos" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="QR generados" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Pagados" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
