import { StatusBadge } from '@/components/status-badge'
import { EyeIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { TableEmptyState, TableErrorState, TableLoadingState } from '@/components/ui/Feedback'
import { formatAmount, formatDateTime } from '@/lib/formatters'
import { getApiErrorMessage } from '@/lib/errors'
import type { PaymentItem } from '@/types/payment-item'

interface ReportTableProps {
  items: PaymentItem[]
  isPending: boolean
  isError: boolean
  error: unknown
  onRetry: () => void
  onSelect: (id: string) => void
}

const COLUMNS = 8

export function ReportTable({ items, isPending, isError, error, onRetry, onSelect }: ReportTableProps) {
  return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-cospail-navy/10 bg-cospail-surface/70 text-xs font-semibold uppercase tracking-wide text-cospail-ink/60">
              <th scope="col" className="px-4 py-3">Código fijo</th>
              <th scope="col" className="px-4 py-3">Documento</th>
              <th scope="col" className="px-4 py-3">Socio</th>
              <th scope="col" className="px-4 py-3 text-right">Monto total</th>
              <th scope="col" className="px-4 py-3">Estado</th>
              <th scope="col" className="px-4 py-3 text-right">Deudas</th>
              <th scope="col" className="px-4 py-3">Creado</th>
              <th scope="col" className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isPending && <TableLoadingState message="Cargando reporte…" colSpan={COLUMNS} />}

            {isError && (
              <TableErrorState
                message={getApiErrorMessage(error, 'No se pudo cargar el reporte.')}
                colSpan={COLUMNS}
                onRetry={onRetry}
              />
            )}

            {!isPending && !isError && items.length === 0 && (
              <TableEmptyState message="Sin resultados para los filtros indicados." colSpan={COLUMNS} />
            )}

            {!isPending &&
              !isError &&
              items.map((item) => (
                <tr
                  key={item.pagoCospailId}
                  className="border-b border-cospail-navy/5 transition last:border-0 hover:bg-cospail-sky-tint/40"
                >
                  <td className="px-4 py-3 font-mono text-[13px] text-cospail-navy">{item.fixedCode}</td>
                  <td className="px-4 py-3 font-mono text-[13px] text-cospail-ink">{item.documentId}</td>
                  <td className="px-4 py-3 text-cospail-ink">{item.memberName ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-mono font-medium text-cospail-navy">
                    {formatAmount(item.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-cospail-ink/70">
                    {item.debts.length > 0 ? item.debts.length : '—'}
                  </td>
                  <td className="px-4 py-3 text-cospail-ink/70">{formatDateTime(item.createdAtUtc)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => onSelect(item.pagoCospailId)}
                      aria-label={`Ver detalle del pago ${item.fixedCode}`}
                    >
                      <EyeIcon className="h-3.5 w-3.5" />
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
  )
}
