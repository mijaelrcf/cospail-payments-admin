import type { PaymentStatus } from './payment-status'

export interface Debt {
  creditNumber: number
  type: number
  noticeNumber: number
  period: string
  amount: number
  status: PaymentStatus
}