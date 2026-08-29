import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropletLogo } from './droplet-logo'
import { LogoutIcon } from './icons'
import { clearSession, getDisplayName } from '../app/auth-storage'

interface Props {
  children: ReactNode
}

export function AdminShell({ children }: Props) {
  const navigate = useNavigate()
  const displayName = getDisplayName()

  const handleLogout = () => {
    clearSession()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-cospail-surface">
      <header className="sticky top-0 z-10 bg-linear-to-r from-cospail-navy-dark via-cospail-navy to-cospail-navy-light shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
              <DropletLogo className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold leading-tight text-white">
                Cospail · Administración
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-cospail-sky">
                Panel de pagos
              </span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {displayName && (
              <span className="hidden max-w-48 truncate text-sm font-medium text-white/80 md:block">
                {displayName}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/40"
            >
              <LogoutIcon className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">{children}</main>
    </div>
  )
}