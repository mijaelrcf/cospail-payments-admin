import { ArrowIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button'

interface ReportPaginationProps {
  page: number
  lastPage: number
  isPending: boolean
  totalCount: number
  rangeStart: number
  rangeEnd: number
  onPageChange: (page: number) => void
}

export function ReportPagination({
  page,
  lastPage,
  isPending,
  totalCount,
  rangeStart,
  rangeEnd,
  onPageChange,
}: ReportPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cospail-navy/10 px-4 py-3">
      <p className="text-sm text-cospail-ink/60">
        Mostrando {rangeStart}-{rangeEnd} de {totalCount}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1 || isPending}
          className="inline-flex items-center gap-1.5 px-3 py-1.5"
        >
          <ArrowIcon direction="left" className="h-4 w-4" />
          Anterior
        </Button>
        <span className="px-1 font-mono text-sm text-cospail-ink/70" aria-live="polite">
          {page} / {lastPage}
        </span>
        <Button
          type="button"
          variant="secondary"
          onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          disabled={page >= lastPage || isPending}
          className="inline-flex items-center gap-1.5 px-3 py-1.5"
        >
          Siguiente
          <ArrowIcon direction="right" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
