'use client'

import type { CardModel } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCard } from '@/hooks/useCards'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

type Props = {
  id: string
}

export const CardDetails = ({ id }: Props) => {
  const categories = useSearchParams().getAll('categories')
  const { isPending, isError, error, data } = useGetCard({ id, categories })
  const [cardToSpeech, setCardToSpeech] = useState<CardModel>()

  if (isPending) {
    return <Loader>Fetching card #{id}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { card } = data

  // ToDo: Refactor wrapper, optional card & cards to speech
  return (
    <div className='flex flex-col items-center'>
      <Card
        card={card}
        isOpen
        setCardToSpeech={setCardToSpeech}
        className='max-w-2xl'
      />
      <aside className='sticky bottom-6 mt-6'>
        <TextToSpeech
          cards={[card]}
          setCardToSpeech={setCardToSpeech}
          cardToSpeech={cardToSpeech}
        />
      </aside>
    </div>
  )
}