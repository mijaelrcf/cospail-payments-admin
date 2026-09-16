import { useQuery } from '@tanstack/react-query'
import { getPaymentDetail } from '@/api/admin'

interface UsePaymentDetailOptions {
  enabled?: boolean
}

export const usePaymentDetail = (pagoCospailId: string | null, options?: UsePaymentDetailOptions) => {
  const enabled = (options?.enabled ?? true) && pagoCospailId !== null
  return useQuery({
    queryKey: ['payment-detail', pagoCospailId],
    queryFn: () => {
      if (!pagoCospailId) throw new Error('Falta el identificador del pago.')
      return getPaymentDetail(pagoCospailId)
    },
    enabled,
  })
}
