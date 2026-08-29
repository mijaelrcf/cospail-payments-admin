export interface QrNotification {
  qrId: string
  transactionId: string
  paymentDate?: string | null
  paymentTime?: string | null
  paymentAtUtc?: string | null
  currency: string
  amount: number
  senderBankCode?: string | null
  senderName?: string | null
  senderDocumentId?: string | null
  senderAccount?: string | null
  description?: string | null
  branchCode?: string | null
  receivedAtUtc?: string | null
}