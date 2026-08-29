const TOKEN_KEY = 'cospail-admin-token'
const DISPLAY_NAME_KEY = 'cospail-admin-display-name'
const EXPIRES_AT_KEY = 'cospail-admin-expires-at'

export interface Session {
  token: string
  displayName: string
  expiresAt: string
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getDisplayName(): string | null {
  return localStorage.getItem(DISPLAY_NAME_KEY)
}

export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false

  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY)
  if (!expiresAt) return true

  const expires = new Date(expiresAt)
  if (Number.isNaN(expires.getTime())) return true

  return expires.getTime() > Date.now()
}

export function saveSession(session: Session): void {
  localStorage.setItem(TOKEN_KEY, session.token)
  localStorage.setItem(DISPLAY_NAME_KEY, session.displayName)
  localStorage.setItem(EXPIRES_AT_KEY, session.expiresAt)
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(DISPLAY_NAME_KEY)
  localStorage.removeItem(EXPIRES_AT_KEY)
}