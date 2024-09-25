'use client'

import { Card } from '@/components/cards/card'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { useGetCard } from '@/hooks/useCards'

type Props = {
  id: string
}

export const CardDetails = ({ id }: Props) => {
  const { isPending, isError, error, data } = useGetCard(id)

  if (isPending) {
    return <Loader className='text-2xl'>Fetching card #{id}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return <Card card={data[0]} isExpanded isOpen />
}
