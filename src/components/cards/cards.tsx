'use client'

import type { CardModel } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { PageControls } from '@/components/pageControls'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import { useState } from 'react'

type Props = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
  categories: string | string[]
  userId: string
  action: string
}

// ToDo: Refactor all search params to lower case
export const Cards = ({ categories, ...restProps }: Props) => {
  const categoriesToArray = categories
    ? Array.isArray(categories)
      ? categories
      : [categories]
    : []

  const normalizedCategories = categoriesToArray.map(category =>
    category.toLowerCase(),
  )

  const { isPending, isError, data, error } = useGetCards({
    categories: normalizedCategories,
    ...restProps,
  })

  const [cardToSpeech, setCardToSpeech] = useState<CardModel>()
  const [isCardPlaying, setIsCardPlaying] = useState(false)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2')

  if (isPending) {
    return <Loader>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cards, ...restData } = data

  if (!cards.length) {
    return <ErrorMessage isCentered>Cards not found 🙈</ErrorMessage>
  }

  const pages = `${restProps.page ?? '1'}/${restData.totalPages}`
  const playlistName = restProps.search
    ? `Search: ${restProps.search} (page ${pages})`
    : `Page ${pages}`

  return (
    <>
      <PageControls
        {...restData}
        currentItems={cards.length}
        columnsCount={columnsCount}
        setColumnsCount={setColumnsCount}
      />
      <Columns count={columnsCount}>
        {cards.map((card, index) => {
          const isCardToSpeech = card.id === cardToSpeech?.id

          return (
            <Card
              key={card.id}
              card={card}
              isCardToSpeech={isCardToSpeech}
              setCardToSpeech={setCardToSpeech}
              isCardPlaying={isCardToSpeech && isCardPlaying}
              pagePosition={index + 1}
            />
          )
        })}
      </Columns>
      <TextToSpeech
        playlistName={playlistName}
        cards={cards}
        cardToSpeech={cardToSpeech}
        setCardToSpeech={setCardToSpeech}
        setIsCardPlaying={setIsCardPlaying}
      />
    </>
  )
}