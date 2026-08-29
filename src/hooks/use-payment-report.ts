import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPaymentReport } from '../api/admin'
import type { ReportParams } from '../api/admin'

export const usePaymentReport = (params: ReportParams) => {
  return useQuery({
    queryKey: ['payment-report', params],
    queryFn: () => getPaymentReport(params),
    placeholderData: keepPreviousData,
  })
}