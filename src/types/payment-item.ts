import type { Debt } from './debt'
import type { PaymentStatus } from './payment-status'

export interface PaymentItem {
  pagoCospailId: string
  fixedCode: number
  documentId: string
  memberName?: string | null
  totalAmount: number
  status: PaymentStatus
  createdAtUtc: string
  debts: Debt[]
}