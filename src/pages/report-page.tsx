import { useState } from 'react'
import type { FormEvent } from 'react'
import { AdminShell } from '../components/admin-shell'
import { StatusBadge } from '../components/status-badge'
import { PaymentDetailModal } from '../components/payment-detail-modal'
import { usePaymentReport } from '../hooks/use-payment-report'
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon } from '../components/icons'
import { formatAmount, formatDateTime } from '../app/formatters'
import type { ReportParams } from '../api/admin'

const PAGE_SIZE = 20

const STATUS_OPTIONS = ['Pendiente', 'QRGenerado', 'Pagado', 'CospailRegistrado', 'Anulado']

interface DraftFilters {
  from: string
  to: string
  status: string
  fixedCode: string
  documentId: string
}

function todayValue(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function defaultFilters(): DraftFilters {
  const today = todayValue()
  return {
    from: today,
    to: today,
    status: 'CospailRegistrado',
    fixedCode: '',
    documentId: '',
  }
}

function buildParams(filters: DraftFilters, page: number): ReportParams {
  const fixedCode = Number(filters.fixedCode)
  return {
    page,
    pageSize: PAGE_SIZE,
    ...(filters.from !== '' && { from: filters.from }),
    ...(filters.to !== '' && { to: filters.to }),
    ...(filters.status !== '' && { status: filters.status }),
    ...(filters.fixedCode !== '' && Number.isFinite(fixedCode) && { fixedCode }),
    ...(filters.documentId !== '' && { documentId: filters.documentId }),
  }
}

const inputClasses =
  'w-full rounded-lg border border-cospail-navy/20 bg-white px-3 py-2 text-sm text-cospail-ink shadow-sm outline-none transition placeholder:text-cospail-ink/35 focus:border-cospail-sky focus:ring-4 focus:ring-cospail-sky/20'

export function ReportPage() {
  const [draft, setDraft] = useState<DraftFilters>(defaultFilters)
  const [applied, setApplied] = useState<DraftFilters>(defaultFilters)
  const [page, setPage] = useState(1)
  const [formError, setFormError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const { data, isPending, isError, refetch } = usePaymentReport(buildParams(applied, page))

  const items = data?.items ?? []
  const totalCount = data?.totalCount ?? 0
  const lastPage = Math.max(1, data?.pageCount ?? 1)
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (draft.from !== '' && draft.to !== '' && draft.to < draft.from) {
      setFormError('La fecha "hasta" no puede ser anterior a la fecha "desde".')
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

      {formError && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {formError}
        </p>
      )}

      <form
        onSubmit={handleSearch}
        className="mb-6 rounded-2xl border border-cospail-navy/10 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label
              htmlFor="from"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60"
            >
              Desde
            </label>
            <input
              id="from"
              type="date"
              value={draft.from}
              onChange={(e) => setDraft({ ...draft, from: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="to"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60"
            >
              Hasta
            </label>
            <input
              id="to"
              type="date"
              value={draft.to}
              onChange={(e) => setDraft({ ...draft, to: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60"
            >
              Estado
            </label>
            <select
              id="status"
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              className={inputClasses}
            >
              <option value="">Todos</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="fixedCode"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60"
            >
              Código fijo
            </label>
            <input
              id="fixedCode"
              type="number"
              value={draft.fixedCode}
              onChange={(e) => setDraft({ ...draft, fixedCode: e.target.value })}
              className={inputClasses}
              placeholder="Ej. 1234"
            />
          </div>

          <div>
            <label
              htmlFor="documentId"
              className="mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60"
            >
              Documento
            </label>
            <input
              id="documentId"
              type="text"
              value={draft.documentId}
              onChange={(e) => setDraft({ ...draft, documentId: e.target.value })}
              className={inputClasses}
              placeholder="Ej. 5678901"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-cospail-navy/20 bg-white px-4 py-2 text-sm font-medium text-cospail-navy transition hover:bg-cospail-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/30"
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-cospail-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-cospail-navy-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/40"
          >
            Buscar
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-cospail-navy/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-cospail-navy/10 bg-cospail-surface/70 text-xs font-semibold uppercase tracking-wide text-cospail-ink/60">
                <th className="px-4 py-3">Código fijo</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Socio</th>
                <th className="px-4 py-3 text-right">Monto total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Deudas</th>
                <th className="px-4 py-3">Creado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isPending && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-sm text-cospail-ink/50">
                    Cargando reporte…
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <p className="text-sm text-red-700">No se pudo cargar el reporte.</p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-3 rounded-lg bg-cospail-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-cospail-navy-dark"
                    >
                      Reintentar
                    </button>
                  </td>
                </tr>
              )}

              {!isPending && !isError && items.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-sm text-cospail-ink/50">
                    Sin resultados para los filtros indicados.
                  </td>
                </tr>
              )}

              {!isPending &&
                !isError &&
                items.map((item) => (
                  <tr
                    key={item.pagoCospailId}
                    onClick={() => setSelectedId(item.pagoCospailId)}
                    className="cursor-pointer border-b border-cospail-navy/5 transition last:border-0 hover:bg-cospail-sky-tint/40"
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
                      <button
                        type="button"
                        onClick={() => setSelectedId(item.pagoCospailId)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-cospail-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-cospail-navy transition hover:border-cospail-sky hover:bg-cospail-sky-tint"
                      >
                        <EyeIcon className="h-3.5 w-3.5" />
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cospail-navy/10 px-4 py-3">
          <p className="text-sm text-cospail-ink/60">
            Mostrando {rangeStart}-{rangeEnd} de {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || isPending}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cospail-navy/20 bg-white px-3 py-1.5 text-sm font-medium text-cospail-navy transition hover:bg-cospail-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Anterior
            </button>
            <span className="px-1 font-mono text-sm text-cospail-ink/70">
              {page} / {lastPage}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={page >= lastPage || isPending}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cospail-navy/20 bg-white px-3 py-1.5 text-sm font-medium text-cospail-navy transition hover:bg-cospail-surface disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <PaymentDetailModal
        open={selectedId !== null}
        pagoCospailId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </AdminShell>
  )
}