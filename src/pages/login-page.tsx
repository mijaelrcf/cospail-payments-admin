import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/use-login'
import { isAuthenticated, saveSession } from '../app/auth-storage'
import { getApiErrorMessage } from '../api/admin'
import { DropletLogo } from '../components/droplet-logo'
import { CheckIcon } from '../components/icons'

const inputClasses =
  'w-full rounded-xl border border-cospail-navy/20 bg-white px-4 py-3 text-sm text-cospail-ink shadow-sm outline-none transition placeholder:text-cospail-ink/35 focus:border-cospail-sky focus:ring-4 focus:ring-cospail-sky/20'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const loginMutation = useLogin()

  if (isAuthenticated()) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const session = await loginMutation.mutateAsync({ username, password })
      saveSession(session)
      navigate('/dashboard')
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo conectar con el servicio. Inténtalo nuevamente.'))
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cospail-surface">
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-cospail-navy/10 sm:grid sm:grid-cols-2">
          <div className="relative overflow-hidden bg-linear-to-br from-cospail-navy-dark via-cospail-navy to-cospail-navy-light p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cospail-sky/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cospail-green/15 blur-3xl"
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                  <DropletLogo className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold leading-tight text-white">
                    Cospail
                  </span>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-cospail-sky">
                    Cooperativa de Agua · R.L.
                  </span>
                </span>
              </div>

              <div className="mt-12 space-y-3">
                <h1 className="font-display text-2xl font-bold leading-snug text-white">
                  Panel de administración
                </h1>
                <p className="text-sm leading-relaxed text-white/75">
                  Gestiona y concilia los pagos recibidos a través de la banca móvil.
                </p>
                <ul className="space-y-2.5 pt-2">
                  {['Reporte de pagos en tiempo real', 'Detalle de deudas por pago', 'Conciliación con notificación QR'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cospail-green/90 text-white">
                          <CheckIcon className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="mx-auto w-full max-w-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cospail-navy/70">
                Acceso restringido
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-cospail-ink">Inicia sesión</h2>
              <p className="mt-1.5 text-sm text-cospail-ink/60">
                Usa tus credenciales de administración del sistema de pagos.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-cospail-ink">
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClasses}
                    placeholder="Tu usuario"
                    required
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-cospail-ink">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClasses}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full rounded-xl bg-cospail-navy px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cospail-navy-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/40 disabled:opacity-50"
                >
                  {loginMutation.isPending ? 'Ingresando…' : 'Ingresar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}