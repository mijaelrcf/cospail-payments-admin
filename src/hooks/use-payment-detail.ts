import { useQuery } from '@tanstack/react-query'
import { getPaymentDetail } from '../api/admin'

export const usePaymentDetail = (pagoCospailId: string | null) => {
  return useQuery({
    queryKey: ['payment-detail', pagoCospailId],
    queryFn: () => getPaymentDetail(pagoCospailId!),
    enabled: pagoCospailId !== null,
  })
}