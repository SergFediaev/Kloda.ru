import { getCategories } from '@/api/categories/categories.api'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
