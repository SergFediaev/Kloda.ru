'use client'

import { Columns } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'

// ToDo: Refactor columns style, error message size, break-inside-avoid if not open
export const Users = () => {
  const { isPending, isError, data, error } = useGetUsers()

  if (isPending) {
    return <Loader className='text-2xl'>Fetching users</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  if (!data?.length) {
    return <ErrorMessage>Users not found 🙈</ErrorMessage>
  }

  const sortedUsers = data.sort((a, b) =>
    b.registeredAt.localeCompare(a.registeredAt),
  )

  return (
    <Columns className='columns-md'>
      {sortedUsers.map(user => (
        <User key={user.id} user={user} className='break-inside-avoid' />
      ))}
    </Columns>
  )
}
