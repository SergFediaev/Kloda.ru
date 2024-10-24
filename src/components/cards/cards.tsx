'use client'

import type { CardResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { Pagination } from '@/components/pagination'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import { useCardsMode } from '@/hooks/useCardsMode'
import { useState } from 'react'

const sorts = {
  id: 'ID',
  title: 'Title',
  content: 'Content',
  likes: 'Likes',
  dislikes: 'Dislikes',
  authorId: 'Author',
  createdAt: 'Created',
  updatedAt: 'Updated',
}

type Props = {
  search: string
  page: number
  limit: number
  order: string
  sort: string
  categories: string[]
  user?: number
  action?: string
}

// ToDo: Refactor all search params to lower case
export const Cards = ({ categories, ...restProps }: Props) => {
  categories = categories.map(category => category.toLowerCase())

  const { isPending, isError, data, error } = useGetCards({
    categories,
    ...restProps,
  })

  const [cardToSpeech, setCardToSpeech] = useState<CardResponse>()
  const [isCardPlaying, setIsCardPlaying] = useState(false)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2')
  const { isStudyMode } = useCardsMode()

  if (isPending) {
    return <Loader className='text-2xl'>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cards, totalCards, totalPages } = data

  const cardsElement = cards.length ? (
    <Columns count={columnsCount}>
      {cards.map(card => {
        const isCardToSpeech = card.id === cardToSpeech?.id

        return (
          <Card
            id={String(card.id)}
            key={card.id}
            card={card}
            className='break-inside-avoid'
            isCardToSpeech={isCardToSpeech}
            setCardToSpeech={setCardToSpeech}
            isCardPlaying={isCardToSpeech && isCardPlaying}
            isStudyMode={isStudyMode}
          />
        )
      })}
    </Columns>
  ) : (
    <ErrorMessage isCentered>Cards not found 🙈</ErrorMessage>
  )

  const { search, page, limit, order, sort } = restProps
  const pages = `${page}/${totalPages}`
  const playlistName = search
    ? `Search: ${search} (page ${pages})`
    : `Page ${pages}`

  // ToDo: Refactor fragment
  return (
    <>
      <Pagination
        itemsName='Cards'
        page={page}
        limit={limit}
        order={order}
        sort={sort}
        sorts={sorts}
        totalItems={totalCards}
        totalPages={totalPages}
        itemsCount={cards.length}
        columnsCount={columnsCount}
        setColumnsCount={setColumnsCount}
      />
      {cardsElement}
      <TextToSpeech
        cards={cards}
        cardToSpeech={cardToSpeech}
        setCardToSpeech={setCardToSpeech}
        setIsCardPlaying={setIsCardPlaying}
        playlistName={playlistName}
      />
    </>
  )
}
