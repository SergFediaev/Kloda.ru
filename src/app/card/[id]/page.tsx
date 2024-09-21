'use client'

import { Card } from '@/components/card'
import { CenteredContainer } from '@/components/centeredContainer'
import { Container } from '@/components/container'
import { Loader } from '@/components/loader'
import type { CardResponse } from '@/services/cards/cards.types'
import { useQuery } from '@tanstack/react-query'

// ToDo: Error, CardPage > Card or all pages > Page
export default function CardPage({
  params: { id },
}: { params: { id: string } }) {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ['card', id],
    queryFn: async (): Promise<CardResponse[]> => {
      const response = await fetch(
        `https://api.kloda.fediaev.ru/v1/cards/${id}`,
      )

      return response.json()
    },
  })

  if (isPending) {
    return (
      <Container>
        <Loader message='Fetching card' className='text-2xl' />
      </Container>
    )
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  return (
    <CenteredContainer>
      <div className='max-w-xl'>
        <Card card={data[0]} isExpanded isOpen />
      </div>
    </CenteredContainer>
  )
}
