'use client'

import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { User } from '@/components/users/user'
import { useGetUser } from '@/hooks/useUsers'

type Props = {
  id: string
}

export const UserProfile = ({ id }: Props) => {
  const { isPending, isError, error, data } = useGetUser(id)

  if (isPending) {
    return <Loader>Fetching user #{id}</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return <User user={data} isOpen />
}
