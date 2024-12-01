import { getStats } from '@/api/stats/stats.api'
import { useQuery } from '@tanstack/react-query'

export const useGetStats = () =>
  useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  })
