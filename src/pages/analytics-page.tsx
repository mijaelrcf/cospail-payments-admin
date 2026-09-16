import { useMemo, useState } from 'react'
import { AdminShell } from '@/components/admin-shell'
import { ErrorState, LoadingState } from '@/components/ui/Feedback'
import { SelectField } from '@/components/ui/Field'
import { getApiErrorMessage } from '@/lib/errors'
import { useAnalyticsSummary } from '@/hooks/use-analytics-summary'
import { AnalyticsChart } from '@/features/analytics/AnalyticsChart'
import { PeriodSection } from '@/features/analytics/PeriodSection'
import { buildYearOptions, toChartData } from '@/features/analytics/analytics-utils'

export function AnalyticsPage() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)
  const { data, isPending, isError, error, refetch } = useAnalyticsSummary(year)

  const years = useMemo(() => buildYearOptions(currentYear), [currentYear])
  const chartData = useMemo(() => toChartData(data?.serieMensual ?? []), [data?.serieMensual])

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-cospail-ink">Panel</h1>
          <p className="mt-1 text-sm text-cospail-ink/60">
            Ingresos vs QR generados vs pagados.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-cospail-ink/70">
          Año
          <SelectField
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            aria-label="Año"
            className="w-auto font-medium text-cospail-navy"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </SelectField>
        </label>
      </div>

      {isPending && <LoadingState message="Cargando analíticas…" />}

      {isError && (
        <ErrorState
          message={getApiErrorMessage(error, 'No se pudo cargar el panel.')}
          onRetry={() => refetch()}
        />
      )}

      {!isPending && !isError && data && (
        <div className="flex flex-col gap-5">
          <PeriodSection title="Hoy" subtitle={data.fecha} period={data.dia} />
          <PeriodSection title="Este mes" subtitle={`Mes actual de ${data.anio}`} period={data.mes} />
          <PeriodSection title="Este año" subtitle={`Acumulado ${data.anio}`} period={data.anioResumen} />

          <AnalyticsChart year={data.anio} data={chartData} />
        </div>
      )}
    </AdminShell>
  )
}
