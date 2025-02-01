'use client'

import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ColumnsRadio } from '@/components/displayOptions'
import { UsersPageControls } from '@/components/displayOptions/usersPageControls'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'
import { useState } from 'react'

type Props = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
}

// ToDo: Refactor columns style, error message size, break-inside-avoid if not open

export const Users = (props: Props) => {
  const { isPending, isError, data, error } = useGetUsers(props)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('2') // ToDo: Users pagination

  if (isPending) {
    return <Loader>Fetching users</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { users, ...restData } = data

  if (!users.length) {
    return <ErrorMessage>Users not found 🙈</ErrorMessage>
  }

  const radioGroup = (
    <ColumnsRadio
      columnsCount={columnsCount}
      setColumnsCount={setColumnsCount}
    />
  )
  return (
    <>
      <UsersPageControls
        {...restData}
        numberOfCurrentItems={users.length}
        radioGroup={radioGroup}
      />
      <Columns count={columnsCount}>
        {users.map(user => (
          <User key={user.id} user={user} inColumns />
        ))}
      </Columns>
    </>
  )
}