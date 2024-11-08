import { Button } from '@/components/button'
import { Wrapper } from '@/components/containers/wrapper'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetCard, useGetRandomCard } from '@/hooks/useCards'
import { usePaths } from '@/hooks/usePaths'
import { CircleChevronLeft, CircleChevronRight, Dices } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import queryString from 'query-string'

export const CardControl = () => {
  const router = useTransitionRouter()
  const { id } = useParams<{ id: string }>()
  const categories = useSearchParams().getAll('categories')

  const { data, isPending, isError, error } = useGetCard({ id, categories })

  const { refetch } = useGetRandomCard({
    currentCardId: Number(id),
    categories,
  })

  if (usePaths().isNotCardPath) {
    return null
  }

  if (isPending) {
    return <Loader>Fetching card #{id}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cardPosition, prevCardId, nextCardId, totalCards } = data
  const hasCards = totalCards > 1
  const hasRandomCards = totalCards > 2

  const onRandom = () =>
    refetch().then(({ data, isSuccess }) => {
      if (isSuccess)
        router.push(`/card/${data.id}?${queryString.stringify({ categories })}`)
    })

  return (
    <Wrapper as='div' hasGaps>
      {hasCards && (
        <Link
          href={{ pathname: `/card/${prevCardId}`, query: { categories } }}
          title={`Previous card ID ${prevCardId}`}
        >
          <CircleChevronLeft />
        </Link>
      )}
      <Wrapper as='p'>
        <span title='Current card'>{cardPosition}</span>
        &nbsp;/&nbsp;
        <span title='Cards in selected categories'>{totalCards}</span>
      </Wrapper>
      {hasCards && (
        <Link
          href={{ pathname: `/card/${nextCardId}`, query: { categories } }}
          title={`Next card ID ${nextCardId}`}
        >
          <CircleChevronRight />
        </Link>
      )}
      {hasRandomCards && (
        <Button variant='text' onClick={onRandom} title='Random card'>
          <Dices />
        </Button>
      )}
    </Wrapper>
  )
}
