import type { PaymentStatus } from '../types/payment-status'

interface StatusBadgeProps {
  status: PaymentStatus
}

const STATUS_STYLES: Record<PaymentStatus, string> = {
  Pendiente: 'border-cospail-navy/20 bg-cospail-surface text-cospail-ink',
  QRGenerado: 'border-cospail-sky/60 bg-cospail-sky-tint text-cospail-navy-dark',
  Pagado: 'border-amber-300 bg-amber-50 text-amber-700',
  PagoRegistrado: 'border-cospail-green/40 bg-cospail-green-tint text-cospail-green-dark',
  Anulado: 'border-red-200 bg-red-50 text-red-700',
}

const DEFAULT_STYLE = 'border-cospail-navy/20 bg-cospail-surface text-cospail-ink'

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] ?? DEFAULT_STYLE}`}
    >
      {status}
    </span>
  )
}