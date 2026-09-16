import { useEffect, useId, useRef } from 'react'
import { XIcon } from './icons'
import { StatusBadge } from './status-badge'
import { Button } from './ui/Button'
import { usePaymentDetail } from '../hooks/use-payment-detail'
import { getApiErrorMessage } from '../lib/errors'
import { formatAmount, formatDateTime, formatQrDateTime } from '../lib/formatters'

interface PaymentDetailModalProps {
  open: boolean
  pagoCospailId: string | null
  onClose: () => void
}

const detailLabel =
  'text-[11px] font-semibold uppercase tracking-wide text-cospail-ink/50'

function FieldValue({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div>
      <dt className={detailLabel}>{label}</dt>
      <dd className="mt-0.5 break-words font-mono text-[13px] text-cospail-ink">{String(value)}</dd>
    </div>
  )
}

export function PaymentDetailModal({ open, pagoCospailId, onClose }: PaymentDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { data, isPending, isError, error, refetch } = usePaymentDetail(pagoCospailId, {
    enabled: open,
  })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [open])

  const qrFields = data?.qrNotification
    ? [
        { label: 'QR', value: data.qrNotification.qrId },
        { label: 'Transacción', value: data.qrNotification.transactionId },
        { label: 'Monto', value: formatAmount(data.qrNotification.amount) },
        { label: 'Moneda', value: data.qrNotification.currency },
        {
          label: 'Fecha / hora de pago',
          value: formatQrDateTime(data.qrNotification.paymentDate, data.qrNotification.paymentTime),
        },
        { label: 'Acreditado', value: formatDateTime(data.qrNotification.paymentAtUtc) },
        { label: 'Banco emisor', value: data.qrNotification.senderBankCode },
        { label: 'Ordenante', value: data.qrNotification.senderName },
        { label: 'Documento ordenante', value: data.qrNotification.senderDocumentId },
        { label: 'Cuenta ordenante', value: data.qrNotification.senderAccount },
        { label: 'Sucursal', value: data.qrNotification.branchCode },
        { label: 'Conciliado', value: formatDateTime(data.qrNotification.receivedAtUtc) },
        { label: 'Descripción', value: data.qrNotification.description },
      ]
    : []

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby={titleId}
      className="m-auto w-full max-w-2xl rounded-2xl bg-white p-0 shadow-xl ring-1 ring-cospail-navy/10 backdrop:bg-cospail-ink/40 backdrop-blur-sm sm:p-6"
    >
      <div>
        <div className="mb-4 flex items-center justify-between px-6 pt-6 sm:px-0 sm:pt-0">
          <h2 id={titleId} className="font-display text-lg font-bold text-cospail-ink">
            Detalle del pago
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del pago"
            className="flex h-8 w-8 items-center justify-center rounded-full text-cospail-ink/40 transition hover:bg-cospail-surface hover:text-cospail-ink"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 sm:px-0 sm:pb-0">
          {isPending && (
            <p role="status" aria-live="polite" className="py-16 text-center text-sm text-cospail-ink/50">
              Cargando detalle…
            </p>
          )}

          {isError && (
            <div className="py-16 text-center">
              <p role="alert" className="text-sm text-red-700">
                {getApiErrorMessage(error, 'No se pudo cargar el detalle del pago.')}
              </p>
              <Button type="button" onClick={() => refetch()} className="mt-3">
                Reintentar
              </Button>
            </div>
          )}

          {!isPending && !isError && !data && (
            <p className="py-16 text-center text-sm text-cospail-ink/50">Sin datos para este pago.</p>
          )}

          {!isPending && !isError && data && (
            <>
              <div className="mb-5 rounded-2xl bg-cospail-surface p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={detailLabel}>Socio</p>
                    <p className="mt-0.5 font-medium text-cospail-ink">{data.memberName ?? 'Sin nombre'}</p>
                    <p className="mt-1 font-mono text-xs text-cospail-ink/60">
                      Código {data.fixedCode} · Doc. {data.documentId}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={data.status} />
                    <p className="mt-2 font-display text-xl font-bold text-cospail-navy">
                      {formatAmount(data.totalAmount)}
                    </p>
                    <p className="text-[11px] text-cospail-ink/50">
                      Creado {formatDateTime(data.createdAtUtc)}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cospail-navy/60">
                Deudas incluidas ({data.debts.length})
              </p>
              <div className="mb-6 overflow-hidden rounded-xl border border-cospail-navy/10">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-cospail-navy/10 bg-cospail-surface/70 text-xs font-semibold uppercase tracking-wide text-cospail-ink/60">
                      <th scope="col" className="px-3 py-2">Período</th>
                      <th scope="col" className="px-3 py-2">Nota</th>
                      <th scope="col" className="px-3 py-2">Crédito</th>
                      <th scope="col" className="px-3 py-2">Tipo</th>
                      <th scope="col" className="px-3 py-2 text-right">Monto</th>
                      <th scope="col" className="px-3 py-2">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.debts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-3 py-6 text-center text-sm text-cospail-ink/50">
                          Sin deudas registradas.
                        </td>
                      </tr>
                    )}
                    {data.debts.map((debt) => (
                      <tr
                        key={`${debt.creditNumber}-${debt.noticeNumber}-${debt.period}`}
                        className="border-b border-cospail-navy/5 last:border-0"
                      >
                        <td className="px-3 py-2 font-medium text-cospail-ink">{debt.period}</td>
                        <td className="px-3 py-2 font-mono text-[13px] text-cospail-ink/70">
                          {debt.noticeNumber}
                        </td>
                        <td className="px-3 py-2 font-mono text-[13px] text-cospail-ink/70">
                          {debt.creditNumber}
                        </td>
                        <td className="px-3 py-2 font-mono text-[13px] text-cospail-ink/70">{debt.type}</td>
                        <td className="px-3 py-2 text-right font-mono font-medium text-cospail-navy">
                          {formatAmount(debt.amount)}
                        </td>
                        <td className="px-3 py-2">
                          <StatusBadge status={debt.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cospail-navy/60">
                Notificación QR
              </p>
              {data.qrNotification ? (
                <div className="rounded-2xl border border-cospail-green/30 bg-cospail-green-tint/60 p-4">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {qrFields.map((field) => (
                      <FieldValue key={field.label} label={field.label} value={field.value} />
                    ))}
                  </dl>
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-cospail-navy/20 bg-cospail-surface px-4 py-6 text-center text-sm text-cospail-ink/50">
                  Sin notificación QR para este pago.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
