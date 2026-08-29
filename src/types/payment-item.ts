import type { Debt } from './debt'

export interface PaymentItem {
  pagoCospailId: string
  fixedCode: number
  documentId: string
  memberName?: string | null
  totalAmount: number
  status: string
  createdAtUtc: string
  updatedAtUtc?: string | null
  debts: Debt[]
}