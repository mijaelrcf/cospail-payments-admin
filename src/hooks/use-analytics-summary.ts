import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAnalyticsSummary } from '../api/admin'

export const useAnalyticsSummary = (year: number) => {
  return useQuery({
    queryKey: ['analytics-summary', year],
    queryFn: () => getAnalyticsSummary(year),
    placeholderData: keepPreviousData,
  })
}
