import type { PaymentStatus } from '@/types/payment-status'
import type { ReportParams } from '@/types/report-params'

export const REPORT_PAGE_SIZE = 20
export const DEFAULT_REPORT_STATUS: PaymentStatus = 'PagoRegistrado'

export interface DraftFilters {
  from: string
  to: string
  status: PaymentStatus | ''
  fixedCode: string
  documentId: string
}

export function todayValue(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function defaultFilters(): DraftFilters {
  const today = todayValue()
  return {
    from: today,
    to: today,
    status: DEFAULT_REPORT_STATUS,
    fixedCode: '',
    documentId: '',
  }
}

export function buildParams(filters: DraftFilters, page: number): ReportParams {
  const fixedCodeRaw = filters.fixedCode.trim()
  const fixedCode = Number(fixedCodeRaw)
  const documentId = filters.documentId.trim()
  return {
    page,
    pageSize: REPORT_PAGE_SIZE,
    ...(filters.from !== '' && { from: filters.from }),
    ...(filters.to !== '' && { to: filters.to }),
    ...(filters.status !== '' && { status: filters.status }),
    ...(fixedCodeRaw !== '' && Number.isFinite(fixedCode) && { fixedCode }),
    ...(documentId !== '' && { documentId }),
  }
}

export function validateFilters(filters: DraftFilters): string | null {
  if (filters.from !== '' && filters.to !== '' && filters.to < filters.from) {
    return 'La fecha "hasta" no puede ser anterior a la fecha "desde".'
  }
  return null
}
