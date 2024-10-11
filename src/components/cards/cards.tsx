'use client'

import type { CardResponse } from '@/api/cards/cards.types'
import { Card } from '@/components/cards/card'
import { Columns } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { Pagination } from '@/components/pagination'
import { TextToSpeech } from '@/components/textToSpeech'
import { useGetCards } from '@/hooks/useCards'
import { useState } from 'react'

const sorts = {
  id: 'ID',
  title: 'Title',
  content: 'Content',
  categories: 'Categories',
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
}

export const Cards = (props: Props) => {
  const { isPending, isError, data, error } = useGetCards(props)
  const [cardToSpeech, setCardToSpeech] = useState<CardResponse>()
  const [isCardPlaying, setIsCardPlaying] = useState(false)

  if (isPending) {
    return <Loader className='text-2xl'>Fetching cards</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { cards, totalCards, totalPages } = data

  const cardsElement = cards.length ? (
    <Columns>
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
          />
        )
      })}
    </Columns>
  ) : (
    <ErrorMessage isCentered>Cards not found 🙈</ErrorMessage>
  )

  const { search, page, limit, order, sort } = props
  const pages = `${page}/${totalPages}`
  const playlistName = search
    ? `Search: ${search} (page ${pages})`
    : `Page ${pages}`

  // ToDo: Refactor fragment
  return (
    <>
      {cardsElement}
      <aside className='sticky bottom-6 mt-6 flex flex-col items-center gap-6'>
        <TextToSpeech
          cards={cards}
          cardToSpeech={cardToSpeech}
          setCardToSpeech={setCardToSpeech}
          setIsCardPlaying={setIsCardPlaying}
          playlistName={playlistName}
        />
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
        />
      </aside>
    </>
  )
}
