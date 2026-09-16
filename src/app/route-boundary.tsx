import { Suspense } from 'react'
import type { ReactNode } from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { LoadingState } from '../components/ui/Feedback'

function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
      <LoadingState message="Cargando…" />
    </div>
  )
}

export function RouteBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
