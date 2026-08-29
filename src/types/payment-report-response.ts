import type { PaymentItem } from './payment-item'

export interface PaymentReportResponse {
  page: number
  pageSize: number
  totalCount: number
  pageCount: number
  items: PaymentItem[]
}