'use client'

import { Card } from '@/components/card'
import { Loader } from '@/components/loader'
import type { CardResponse } from '@/services/cards/cards.types'
import { useQuery } from '@tanstack/react-query'

type Props = {
  id: string
}

// ToDo: Error
export const CardDetails = ({ id }: Props) => {
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
    return <Loader message={`Fetching card #${id}`} className='text-2xl' />
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  return <Card card={data[0]} isExpanded isOpen />
}
