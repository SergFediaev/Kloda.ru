'use client'

import { Card } from '@/components/card'
import { Loader } from '@/components/loader'
import { useGetCards } from '@/hooks/useCards'

// ToDo: Error
export const Cards = () => {
  const { isPending, isError, data, error } = useGetCards()

  if (isPending) {
    return <Loader message='Fetching cards' className='text-2xl' />
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  if (!data?.length) {
    return 'Cards not found 🙈'
  }

  return (
    <div className='columns-lg gap-x-6 space-y-6'>
      {data.map(card => (
        <Card key={card.id} card={card} className='break-inside-avoid' />
      ))}
    </div>
  )
}
