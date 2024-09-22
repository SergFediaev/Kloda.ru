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
        <Loader message='Fetching cards' className='text-2xl' />
      </Container>
    )
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  if (!data?.length) {
    return <Container>Cards not found 🙈</Container>
  }

  return (
    <Container>
      <div className='columns-lg gap-x-6 space-y-6'>
        {data.map(card => (
          <Card key={card.id} card={card} className='break-inside-avoid' />
        ))}
      </div>
    </Container>
  )
}
