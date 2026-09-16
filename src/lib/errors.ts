import { AxiosError } from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { detail?: string; message?: string; title?: string } | undefined
    if (data?.detail) return data.detail
    if (data?.message) return data.message
    if (data?.title) return data.title
    if (error.response?.status === 401) return 'Credenciales incorrectas.'
  }
  return fallback
}
