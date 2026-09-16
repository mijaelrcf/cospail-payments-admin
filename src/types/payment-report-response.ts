import type { PaymentItem } from './payment-item'

export interface PaymentReportResponse {
  totalCount: number
  pageCount: number
  items: PaymentItem[]
}