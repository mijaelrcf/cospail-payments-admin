export type PaymentStatus = 'Pendiente' | 'QRGenerado' | 'Pagado' | 'PagoRegistrado' | 'Anulado'

export const PAYMENT_STATUS_OPTIONS: readonly PaymentStatus[] = [
  'Pendiente',
  'QRGenerado',
  'Pagado',
  'PagoRegistrado',
  'Anulado',
] as const
