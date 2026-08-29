import type { PaymentItem } from './payment-item'
import type { QrNotification } from './qr-notification'

export interface PaymentDetail extends PaymentItem {
  qrNotification?: QrNotification | null
}