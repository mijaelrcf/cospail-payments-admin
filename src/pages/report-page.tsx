import { useMemo, useState } from 'react'
import { AdminShell } from '@/components/admin-shell'
import { PaymentDetailModal } from '@/components/payment-detail-modal'
import { InlineError } from '@/components/ui/Feedback'
import { usePaymentReport } from '@/hooks/use-payment-report'
import {
  REPORT_PAGE_SIZE,
  buildParams,
  defaultFilters,
  validateFilters,
  type DraftFilters,
} from '@/features/report/report-filters'
import { ReportFilters } from '@/features/report/ReportFilters'
import { ReportTable } from '@/features/report/ReportTable'
import { ReportPagination } from '@/features/report/ReportPagination'

export function ReportPage() {
  const [draft, setDraft] = useState<DraftFilters>(defaultFilters)
  const [applied, setApplied] = useState<DraftFilters>(defaultFilters)
  const [page, setPage] = useState(1)
  const [formError, setFormError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const params = useMemo(() => buildParams(applied, page), [applied, page])
  const { data, isPending, isError, error, refetch } = usePaymentReport(params)

  const items = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const lastPage = Math.max(1, data?.pageCount ?? 1)
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * REPORT_PAGE_SIZE + 1
  const rangeEnd = Math.min(page * REPORT_PAGE_SIZE, totalCount)

  const handleSearch = () => {
    const validationError = validateFilters(draft)
    if (validationError) {
      setFormError(validationError)
      return
    }
    setFormError(null)
    setApplied(draft)
    setPage(1)
  }

  const handleClear = () => {
    const defaults = defaultFilters()
    setDraft(defaults)
    setFormError(null)
    setApplied(defaults)
    setPage(1)
  }

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-cospail-ink">Reporte de pagos</h1>
        <p className="mt-1 text-sm text-cospail-ink/60">
          Consulta, filtra y concilia los pagos registrados en el sistema.
        </p>
      </div>

      {formError && <InlineError message={formError} />}

      <ReportFilters draft={draft} onChange={setDraft} onSearch={handleSearch} onClear={handleClear} />

      <div className="overflow-hidden rounded-2xl border border-cospail-navy/10 bg-white shadow-sm">
        <ReportTable
          items={items}
          isPending={isPending}
          isError={isError}
          error={error}
          onRetry={() => refetch()}
          onSelect={setSelectedId}
        />

        <ReportPagination
          page={page}
          lastPage={lastPage}
          isPending={isPending}
          totalCount={totalCount}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onPageChange={setPage}
        />
      </div>

      <PaymentDetailModal
        open={selectedId !== null}
        pagoCospailId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </AdminShell>
  )
}
