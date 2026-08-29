const dateTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatAmount(amount: number): string {
  return `Bs ${amount.toFixed(2)}`
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return dateTimeFormatter.format(date)
}

export function formatQrDateTime(date?: string | null, time?: string | null): string {
  if (date && time) return `${date} ${time}`
  return date ?? time ?? '—'
}