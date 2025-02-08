'use client'

import { Block } from '@/components/containers/block'
import { ErrorMessage } from '@/components/errorMessage'
import { CreateCardForm } from '@/components/forms/createCardForm'
import { GoBack } from '@/components/goBack'
import { Loader } from '@/components/loader'
import { useMe } from '@/hooks/useAuth'

type Props = {
  heading: string
}

export const CreateCardModal = (props: Props) => {
  const { data, isPending, isError, error } = useMe()

  if (isPending) {
    return <Loader>Fetching user</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { username, email, id } = data

  return (
    <Block isHeadingCentered isConstrained className='max-w-xl' {...props}>
      <CreateCardForm username={username} email={email} authorId={id} />
      <GoBack />
    </Block>
  )
}