import { Component } from 'react'
import type { ReactNode } from 'react'
import { Button } from './ui/Button'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: unknown): void {
    console.error('Error no controlado en la app:', error)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto w-full max-w-lg px-6 py-16 text-center">
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 shadow-sm"
          >
            <h1 className="font-display text-lg font-bold text-cospail-ink">
              Algo salió mal
            </h1>
            <p className="mt-2 text-sm text-red-700">
              Ocurrió un error inesperado. Puedes recargar la página o volver a intentarlo.
            </p>
            <Button type="button" onClick={this.handleReset} className="mt-4">
              Recargar página
            </Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
