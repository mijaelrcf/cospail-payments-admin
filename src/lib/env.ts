export function getApiBaseUrl(): string {
  const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined
  if (!baseURL || baseURL.trim() === '') {
    throw new Error(
      'Falta VITE_API_BASE_URL. Define la URL base de la API en tu archivo .env (ver .env.example).',
    )
  }
  return baseURL
}
