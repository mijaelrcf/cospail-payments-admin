const dateTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const amountFormatter = new Intl.NumberFormat('es-BO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const integerFormatter = new Intl.NumberFormat('es-BO')

export const EMPTY_FALLBACK = '—'

export function formatAmount(amount: number): string {
  return `Bs ${amountFormatter.format(amount)}`
}

export function formatInteger(value: number): string {
  return integerFormatter.format(value)
}

export function formatPct(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return EMPTY_FALLBACK
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return dateTimeFormatter.format(date)
}

export function formatQrDateTime(date?: string | null, time?: string | null): string {
  if (date && time) return `${date} ${time}`
  return date ?? time ?? EMPTY_FALLBACK
}
