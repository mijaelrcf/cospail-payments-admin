import { Link } from 'react-router-dom'
import { ROUTES } from '../lib/routes'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cospail-surface px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-cospail-navy/10 bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-sm text-cospail-ink/50">404</p>
        <h1 className="mt-2 font-display text-xl font-bold text-cospail-ink">
          Página no encontrada
        </h1>
        <p className="mt-2 text-sm text-cospail-ink/60">
          La dirección que buscas no existe o fue movida.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            to={ROUTES.panel}
            className="rounded-lg bg-cospail-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-cospail-navy-dark"
          >
            Ir al panel
          </Link>
          <Link
            to={ROUTES.login}
            className="rounded-lg border border-cospail-navy/20 bg-white px-4 py-2 text-sm font-medium text-cospail-navy transition hover:bg-cospail-surface"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
