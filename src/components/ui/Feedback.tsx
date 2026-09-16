import { Button } from './Button'

export function LoadingState({ message }: { message: string }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-cospail-navy/10 bg-white px-4 py-16 text-center text-sm text-cospail-ink/50 shadow-sm"
    >
      {message}
    </p>
  )
}

export function TableLoadingState({ message, colSpan }: { message: string; colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-16 text-center text-sm text-cospail-ink/50" role="status" aria-live="polite">
        {message}
      </td>
    </tr>
  )
}

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-10 text-center shadow-sm"
    >
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <Button type="button" onClick={onRetry} className="mt-3">
          Reintentar
        </Button>
      )}
    </div>
  )
}

export function TableErrorState({
  message,
  colSpan,
  onRetry,
}: ErrorStateProps & { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-16 text-center">
        <p role="alert" className="text-sm text-red-700">
          {message}
        </p>
        {onRetry && (
          <Button type="button" onClick={onRetry} className="mt-3">
            Reintentar
          </Button>
        )}
      </td>
    </tr>
  )
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="rounded-2xl border border-cospail-navy/10 bg-white px-4 py-16 text-center text-sm text-cospail-ink/50 shadow-sm">
      {message}
    </p>
  )
}

export function TableEmptyState({ message, colSpan }: { message: string; colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-16 text-center text-sm text-cospail-ink/50">
        {message}
      </td>
    </tr>
  )
}

export function InlineError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700"
    >
      {message}
    </p>
  )
}
