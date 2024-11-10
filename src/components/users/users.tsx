'use client'

import { Columns, type ColumnsCount } from '@/components/containers/columns'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { Pagination } from '@/components/pagination'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'
import { useState } from 'react'

const SORTS = {
  id: 'ID',
  username: 'Username',
  email: 'Email',
  createdCardsCount: 'Created cards',
  favoriteCardsCount: 'Favorite cards',
  likedCardsCount: 'Liked cards',
  dislikedCardsCount: 'Disliked cards',
  registeredAt: 'Registered',
  lastLoginAt: 'Last login',
} as const

type Props = {
  search: string
  page: number
  limit: number
  order: string
  sort: string
}

// ToDo: Refactor columns style, error message size, break-inside-avoid if not open
export const Users = (props: Props) => {
  const { isPending, isError, data, error } = useGetUsers(props)
  const [columnsCount, setColumnsCount] = useState<ColumnsCount>('3') // ToDo: Users pagination

  if (isPending) {
    return <Loader>Fetching users</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { users, totalUsers, totalPages } = data

  const usersElement = users.length ? (
    <Columns count={columnsCount}>
      {users.map(user => (
        <User key={user.id} user={user} inColumns />
      ))}
    </Columns>
  ) : (
    <ErrorMessage>Users not found 🙈</ErrorMessage>
  )

  const { page, limit, order, sort } = props

  return (
    <>
      <Pagination
        itemsName='Users'
        page={page}
        limit={limit}
        order={order}
        sort={sort}
        sorts={SORTS}
        totalItems={totalUsers}
        totalPages={totalPages}
        itemsCount={users.length}
        columnsCount={columnsCount}
        setColumnsCount={setColumnsCount}
      />
      {usersElement}
    </>
  )
}
