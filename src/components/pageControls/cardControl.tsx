'use client'

import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetCard, useGetRandomCard } from '@/hooks/useCards'
import { CircleChevronLeft, CircleChevronRight, Dices } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import queryString from 'query-string'

export const CardControl = () => {
  const router = useTransitionRouter()
  const { id: cardId } = useParams<{ id: string }>()
  const categories = useSearchParams().getAll('categories')

  const { data, isPending, isError, error } = useGetCard({ cardId, categories })

  const { refetch } = useGetRandomCard({
    currentCardId: cardId,
    categories,
  })

  if (isPending) {
    return <Loader>Fetching card #{cardId}</Loader>
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
        router.push(
          `/card/${data.cardId}?${queryString.stringify({ categories })}`,
        )
    })

  return (
    <Wrapper as='div' hasGaps className='flex items-center justify-center'>
      {hasCards && (
        <Button
          as={Link}
          variant='text'
          href={{ pathname: `/card/${prevCardId}`, query: { categories } }}
          title={`Previous card ID ${prevCardId}`}
          className='hover:text-accent-dark dark:hover:text-accent'
        >
          <CircleChevronLeft />
        </Button>
      )}
      <Wrapper as='p'>
        <span title='Current card'>{cardPosition}</span>
        &nbsp;/&nbsp;
        <span title='Cards in selected categories'>{totalCards}</span>
      </Wrapper>
      {hasCards && (
        <Button
          as={Link}
          variant='text'
          href={{ pathname: `/card/${nextCardId}`, query: { categories } }}
          title={`Next card ID ${nextCardId}`}
          className='hover:text-accent-dark dark:hover:text-accent'
        >
          <CircleChevronRight />
        </Button>
      )}
      {hasRandomCards && (
        <Button variant='text' onClick={onRandom} title='Random card'>
          <Dices />
        </Button>
      )}
    </Wrapper>
  )
}