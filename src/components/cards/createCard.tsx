'use client'

import { Block } from '@/components/containers/block'
import { ErrorMessage } from '@/components/errorMessage'
import { CardForm } from '@/components/forms/cardForm'
import { Loader } from '@/components/loader'
import { ReturnToCards } from '@/components/returnToCards'
import { useMe } from '@/hooks/useAuth'

type Props = {
  heading: string
}

export const CreateCard = (props: Props) => {
  const { data, isPending, isError, error } = useMe()

  if (isPending) {
    return <Loader>Fetching user</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return (
    <Block isHeadingCentered isConstrained className='max-w-xl' {...props}>
      <CardForm
        username={data.username}
        email={data.email}
        authorId={data.id}
      />
      <ReturnToCards />
    </Block>
  )
}
