import { useState } from 'react'
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
import { AdminShell } from '../components/admin-shell'
import { useAnalyticsSummary } from '../hooks/use-analytics-summary'
import type { AnalyticsPeriod } from '../types/analytics-summary'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

function KpiCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        accent ? 'border-cospail-sky/40' : 'border-cospail-navy/10'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-cospail-ink/60">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-cospail-navy">
        {value.toLocaleString('es-BO')}
      </p>
    </div>
  )
}

function PeriodSection({
  title,
  subtitle,
  period,
}: {
  title: string
  subtitle: string
  period: AnalyticsPeriod
}) {
  return (
    <section className="rounded-2xl border border-cospail-navy/10 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="font-display text-lg font-bold text-cospail-ink">{title}</h2>
      <p className="mb-4 mt-0.5 text-sm text-cospail-ink/60">{subtitle}</p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard label="Ingresos" value={period.ingresos} accent />
        <KpiCard label="QR generados" value={period.qrGenerados} />
        <KpiCard label="Pagados" value={period.pagados} />
        <div className="rounded-2xl border border-cospail-navy/10 bg-cospail-surface/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cospail-ink/60">
            Conversión QR → pago
          </p>
          <p className="mt-1 font-display text-3xl font-bold text-cospail-navy">
            {formatPct(period.conversionQrAPago)}
          </p>
        </div>
      </div>
    </section>
  )
}

export function AnalyticsPage() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const { data, isPending, isError, refetch } = useAnalyticsSummary(year)

  const years = [currentYear - 2, currentYear - 1, currentYear].filter((y) => y >= 2000)

  const chartData = (data?.serieMensual ?? []).map((p) => ({
    mes: MESES[p.mes - 1] ?? `M${p.mes}`,
    Ingresos: p.ingresos,
    'QR generados': p.qrGenerados,
    Pagados: p.pagados,
  }))

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-cospail-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-cospail-ink/60">
            Ingresos vs QR generados vs pagados.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-cospail-ink/70">
          Año
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-cospail-navy/20 bg-white px-3 py-2 text-sm font-medium text-cospail-navy shadow-sm outline-none focus:border-cospail-sky"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isPending && (
        <p className="rounded-2xl border border-cospail-navy/10 bg-white px-4 py-16 text-center text-sm text-cospail-ink/50 shadow-sm">
          Cargando analíticas…
        </p>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center shadow-sm">
          <p className="text-sm text-red-700">No se pudo cargar el dashboard.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg bg-cospail-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-cospail-navy-dark"
          >
            Reintentar
          </button>
        </div>
      )}

      {!isPending && !isError && data && (
        <div className="flex flex-col gap-5">
          <PeriodSection title="Hoy" subtitle={data.fecha} period={data.dia} />
          <PeriodSection title="Este mes" subtitle={`Mes actual de ${data.anio}`} period={data.mes} />
          <PeriodSection title="Este año" subtitle={`Acumulado ${data.anio}`} period={data.anioResumen} />

          <section className="rounded-2xl border border-cospail-navy/10 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="font-display text-lg font-bold text-cospail-ink">Serie mensual {data.anio}</h2>
            <p className="mb-4 mt-0.5 text-sm text-cospail-ink/60">
              Comparativa mes a mes de ingresos, QR generados y pagos.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
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
          </section>
        </div>
      )}
    </AdminShell>
  )
}
