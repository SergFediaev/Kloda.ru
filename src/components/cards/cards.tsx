'use client'

import { Card } from '@/components/cards/card'
import { Columns } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetCards } from '@/hooks/useCards'

export const Cards = () => {
  const { isPending, isError, data, error } = useGetCards()

  if (isPending) {
    return <Loader className='text-2xl'>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  if (!data?.length) {
    return <ErrorMessage>Cards not found 🙈</ErrorMessage>
  }

  return (
    <Columns>
      {data.map(card => (
        <Card key={card.id} card={card} className='break-inside-avoid' />
      ))}
    </Columns>
  )
}
