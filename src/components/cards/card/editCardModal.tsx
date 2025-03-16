'use client'

import { Block } from '@/components/containers/block'
import { ErrorMessage } from '@/components/errorMessage'
import { EditCardForm } from '@/components/forms/editCardForm'
import { Loader } from '@/components/loader'
import { useGetCard } from '@/hooks/useCards'

type Props = {
  heading: string
  cardId: string
}

// ToDo: Refactor block style max-w-xl
export const EditCardModal = ({ cardId, ...restProps }: Props) => {
  const { data, isPending, isError, error } = useGetCard({ id: cardId })

  if (isPending) {
    return <Loader>Fetching card #{cardId}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return (
    <Block isHeadingCentered isConstrained className='max-w-xl' {...restProps}>
      <EditCardForm card={data.card} />
    </Block>
  )
}