import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetStats } from '@/hooks/useStats'

export const TotalCardsCount = () => {
  const { data, isPending, isError, error } = useGetStats()

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return `All (${data.totalCards})`
}
