import { formatInteger } from '@/lib/formatters'

interface KpiCardProps {
  label: string
  value: number
  accent?: boolean
}

export function KpiCard({ label, value, accent }: KpiCardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white p-4 shadow-sm ${
        accent ? 'border-cospail-sky/40' : 'border-cospail-navy/10'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-cospail-ink/60">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-cospail-navy">
        {formatInteger(value)}
      </p>
    </div>
  )
}
