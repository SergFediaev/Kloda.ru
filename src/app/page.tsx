'use client'

import { Card } from '@/components/card'
import { Container } from '@/components/container'
import { Loader } from '@/components/loader'
import type { CardResponse } from '@/services/cards/cards.types'
import { useQuery } from '@tanstack/react-query'

// ToDo: README.md
// ToDo: Error
export default function Home() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['cards'],
    queryFn: async (): Promise<CardResponse[]> => {
      const response = await fetch('https://api.kloda.fediaev.ru/v1/cards')
      return response.json()
    },
  })

  if (isPending) {
    return (
      <Container>
        <Loader className='text-3xl' />
      </Container>
    )
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  return (
    <Container>
      <div className='space-y-8 gap-x-8 columns-lg'>
        {data.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </Container>
  )
}
