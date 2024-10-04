'use client'

import type { CardResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCard } from '@/hooks/useCards'
import { useState } from 'react'

type Props = {
  id: string
}

export const CardDetails = ({ id }: Props) => {
  const { isPending, isError, error, data } = useGetCard(id)
  const [cardToSpeech, setCardToSpeech] = useState<CardResponse>()

  if (isPending) {
    return <Loader className='text-2xl'>Fetching card #{id}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const card = data[0]

  // ToDo: Refactor wrapper, optional card & cards to speech
  return (
    <div className='flex flex-col items-center'>
      <Card
        id={String(card.id)}
        card={card}
        isExpanded
        isOpen
        setCardToSpeech={setCardToSpeech}
        className='max-w-2xl'
      />
      <TextToSpeech
        cards={data}
        setCardToSpeech={setCardToSpeech}
        cardToSpeech={cardToSpeech}
      />
    </div>
  )
}
