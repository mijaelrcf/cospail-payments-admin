import axios from 'axios'
import { clearSession, getToken } from '../app/auth-storage'
import { queryClient } from '../app/query-client'
import { getApiBaseUrl } from '../lib/env'
import { ROUTES } from '../lib/routes'

export const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? ''
      // No redirigir en el propio login: el 401 ahí significa credenciales incorrectas.
      if (!url.includes('/admin/auth/login')) {
        clearSession()
        void queryClient.clear()
        if (window.location.pathname !== ROUTES.login) {
          window.location.assign(ROUTES.login)
        }
      }
    }
    return Promise.reject(error)
  },
)
