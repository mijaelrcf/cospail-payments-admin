import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getPaymentReport } from '@/api/admin'
import type { ReportParams } from '@/types/report-params'

export function useKeepPreviousQuery<T>(queryKey: readonly unknown[], queryFn: () => Promise<T>) {
  return useQuery({
    queryKey,
    queryFn,
    placeholderData: keepPreviousData,
  })
}

export const usePaymentReport = (params: ReportParams) => {
  return useKeepPreviousQuery(['payment-report', params], () => getPaymentReport(params))
}
