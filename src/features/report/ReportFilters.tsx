import type { FormEvent } from 'react'
import { PAYMENT_STATUS_OPTIONS } from '@/types/payment-status'
import { Button } from '@/components/ui/Button'
import { Field, SelectField, TextField } from '@/components/ui/Field'
import type { DraftFilters } from './report-filters'

interface ReportFiltersProps {
  draft: DraftFilters
  onChange: (draft: DraftFilters) => void
  onSearch: () => void
  onClear: () => void
}

export function ReportFilters({ draft, onChange, onSearch, onClear }: ReportFiltersProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-cospail-navy/10 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Field id="from" label="Desde">
          <TextField
            id="from"
            type="date"
            value={draft.from}
            onChange={(e) => onChange({ ...draft, from: e.target.value })}
          />
        </Field>

        <Field id="to" label="Hasta">
          <TextField
            id="to"
            type="date"
            value={draft.to}
            onChange={(e) => onChange({ ...draft, to: e.target.value })}
          />
        </Field>

        <Field id="status" label="Estado">
          <SelectField
            id="status"
            value={draft.status}
            onChange={(e) => onChange({ ...draft, status: e.target.value as DraftFilters['status'] })}
          >
            <option value="">Todos</option>
            {PAYMENT_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </Field>

        <Field id="fixedCode" label="Código fijo">
          <TextField
            id="fixedCode"
            type="number"
            min={0}
            value={draft.fixedCode}
            onChange={(e) => onChange({ ...draft, fixedCode: e.target.value })}
            placeholder="Ej. 1234"
          />
        </Field>

        <Field id="documentId" label="Documento">
          <TextField
            id="documentId"
            type="text"
            value={draft.documentId}
            onChange={(e) => onChange({ ...draft, documentId: e.target.value })}
            placeholder="Ej. 5678901"
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClear}>
          Limpiar
        </Button>
        <Button type="submit" variant="primary" className="px-5">
          Buscar
        </Button>
      </div>
    </form>
  )
}
