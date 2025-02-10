'use client'

import { Block } from '@/components/containers/block'
import { ErrorMessage } from '@/components/errorMessage'
import { EditCardForm } from '@/components/forms/editCardForm'
import { Loader } from '@/components/loader'
import { useGetCard } from '@/hooks/useCards'

type Props = {
  heading: string
  id: string
}

// ToDo: Refactor block style max-w-xl
export const EditCardModal = ({ id, ...restProps }: Props) => {
  const { data, isPending, isError, error } = useGetCard({ id })

  if (isPending) {
    return <Loader>Fetching card #{id}</Loader>
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