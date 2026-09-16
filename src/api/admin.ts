import { axiosClient } from './axios-client'
import type { AnalyticsSummary } from '../types/analytics-summary'
import type { LoginResponse } from '../types/login-response'
import type { LoginRequest } from '../types/login-request'
import type { PaymentReportResponse } from '../types/payment-report-response'
import type { PaymentDetail } from '../types/payment-detail'
import type { ReportParams } from '../types/report-params'

export type { LoginRequest, ReportParams }
export { getApiErrorMessage } from '../lib/errors'

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

export async function getAnalyticsSummary(year?: number): Promise<AnalyticsSummary> {
  const response = await axiosClient.get('/admin/analytics/summary', {
    params: year ? { year } : undefined,
  })
  return response.data
}