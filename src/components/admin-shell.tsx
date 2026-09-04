import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { DropletLogo } from './droplet-logo'
import { LogoutIcon } from './icons'
import { clearSession, getDisplayName } from '../app/auth-storage'

interface Props {
  children: ReactNode
}

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-xs font-semibold transition ${
    isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`

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
                Cooperativa de Agua · R.L.
              </span>
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <nav className="mr-1 hidden items-center gap-1 sm:flex">
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>
              <NavLink to="/reporte" className={navLinkClasses}>
                Reporte
              </NavLink>
            </nav>
            {displayName && (
              <>
                <span aria-hidden="true" className="hidden h-6 w-px bg-white/15 md:block" />
                <span className="hidden items-center gap-2.5 rounded-xl bg-white/10 py-1.5 pl-1.5 pr-3 ring-1 ring-white/15 md:flex">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cospail-sky/25 text-xs font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-cospail-sky">
                      Administrador
                    </span>
                    <span className="block max-w-40 truncate text-sm font-semibold text-white">
                      {displayName}
                    </span>
                  </span>
                </span>
              </>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/40"
            >
              <LogoutIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl items-center gap-1 px-6 pb-3 sm:hidden sm:px-8">
          <NavLink to="/dashboard" className={navLinkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/reporte" className={navLinkClasses}>
            Reporte
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">{children}</main>
    </div>
  )
}