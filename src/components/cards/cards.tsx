'use client'

import { Card } from '@/components/cards/card'
import { Columns } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetCards } from '@/hooks/useCards'

type Props = {
  search: string
  page: number
}

export const Cards = (props: Props) => {
  const { isPending, isError, data, error } = useGetCards(props)

  if (isPending) {
    return <Loader className='text-2xl'>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  if (!data.cards.length) {
    return <ErrorMessage>Cards not found 🙈</ErrorMessage>
  }

  const sortedCards = data.cards.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )

  return (
    <Columns>
      {sortedCards.map(card => (
        <Card key={card.id} card={card} className='break-inside-avoid' />
      ))}
    </Columns>
  )
}
