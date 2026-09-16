import type { PaymentStatus } from './payment-status'

export interface ReportParams {
  page: number
  pageSize: number
  from?: string
  to?: string
  status?: PaymentStatus | ''
  fixedCode?: number
  documentId?: string
}
