import { Card, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { formatPct } from '@/lib/formatters'
import type { AnalyticsPeriod } from '@/types/analytics-summary'
import { KpiCard } from './KpiCard'

interface PeriodSectionProps {
  title: string
  subtitle: string
  period: AnalyticsPeriod
}

export function PeriodSection({ title, subtitle, period }: PeriodSectionProps) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subtitle}</CardSubtitle>
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
    </Card>
  )
}
