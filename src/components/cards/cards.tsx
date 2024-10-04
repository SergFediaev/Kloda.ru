'use client'

import type { CardResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import { useState } from 'react'

type Props = {
  search: string
  page: number
}

export const Cards = (props: Props) => {
  const { isPending, isError, data, error } = useGetCards(props)
  const [cardToSpeech, setCardToSpeech] = useState<CardResponse>()

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

  // ToDo: Refactor fragment
  return (
    <>
      <Columns>
        {sortedCards.map(card => (
          <Card
            id={String(card.id)}
            key={card.id}
            card={card}
            className='break-inside-avoid'
            isCardToSpeech={card.id === cardToSpeech?.id}
            setCardToSpeech={setCardToSpeech}
          />
        ))}
      </Columns>
      <TextToSpeech
        cards={sortedCards}
        cardToSpeech={cardToSpeech}
        setCardToSpeech={setCardToSpeech}
      />
    </>
  )
}
