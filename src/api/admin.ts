import { AxiosError } from 'axios'
import { axiosClient } from './axios-client'
import type { LoginResponse } from '../types/login-response'
import type { PaymentReportResponse } from '../types/payment-report-response'
import type { PaymentDetail } from '../types/payment-detail'

export interface LoginRequest {
  username: string
  password: string
}

export interface ReportParams {
  page: number
  pageSize: number
  from?: string
  to?: string
  status?: string
  fixedCode?: number
  documentId?: string
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await axiosClient.post('/admin/auth/login', payload)
  return response.data
}

export async function getPaymentReport(params: ReportParams): Promise<PaymentReportResponse> {
  const response = await axiosClient.get('/admin/payments/report', { params })
  return response.data
}

export async function getPaymentDetail(pagoCospailId: string): Promise<PaymentDetail> {
  const response = await axiosClient.get(`/admin/payments/${pagoCospailId}`)
  return response.data
}

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