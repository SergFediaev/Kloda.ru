'use client'

import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'
import { useState } from 'react'

// ToDo: Refactor columns style, error message size, break-inside-avoid if not open
export const Users = () => {
  const { isPending, isError, data, error } = useGetUsers()
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('3') // ToDo: Users pagination

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
    <Columns count={columnsCount}>
      {sortedUsers.map(user => (
        <User key={user.id} user={user} className='break-inside-avoid' />
      ))}
    </Columns>
  )
}
