'use client'

import { Card } from '@/components/card'
import { Loader } from '@/components/loader'
import { useGetCard } from '@/hooks/useCards'

type Props = {
  id: string
}

// ToDo: Error
export const CardDetails = ({ id }: Props) => {
  const { isPending, isError, error, data } = useGetCard(id)

  if (isPending) {
    return <Loader message={`Fetching card #${id}`} className='text-2xl' />
  }

  if (isError) {
    return `Error: ${error.message}`
  }

  return <Card card={data[0]} isExpanded isOpen />
}
