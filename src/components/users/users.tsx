'use client'

import { Button } from '@/components/buttons/button'
import { Columns, type ColumnsCount } from '@/components/containers/columns'
import {
  ColumnsRadio,
  ItemsPerPage,
  type Key,
  Pagination,
  SelectorsGroup,
} from '@/components/displayOptions'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { User } from '@/components/users/user'
import { useGetUsers } from '@/hooks/useUsers'
import { setFirstPage } from '@/utils/setFirstPage'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

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
  const pathname = usePathname()
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const hasSearchParams = searchParams.toString() !== ''

  const onChangeParams = useCallback(
    (key: Key, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (key === 'limit') setFirstPage(params)

      params.set(key, value)
      replace(`?${params}`)
    },
    [searchParams, replace],
  )

  if (isPending) {
    return <Loader>Fetching users</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const { users, totalUsers, totalPages } = data

  const onReset = () => replace(pathname)

  if (!users.length) {
    return <ErrorMessage>Users not found 🙈</ErrorMessage>
  }

  return (
    <>
      <div className='flex items-center justify-around gap-3'>
        <Pagination
          itemsName='Users'
          {...props}
          totalPages={totalPages}
          onChangeParams={onChangeParams}
        />
        <ItemsPerPage
          itemsName='Users'
          totalItems={totalUsers}
          currentItems={users.length}
        />
        <SelectorsGroup
          itemsName='Users'
          {...props}
          onChangeParams={onChangeParams}
          itemsCount={users.length}
        />
        <ColumnsRadio
          columnsCount={columnsCount}
          setColumnsCount={setColumnsCount}
        />
        {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
      </div>
      <Columns count={columnsCount}>
        {users.map(user => (
          <User key={user.id} user={user} inColumns />
        ))}
      </Columns>
    </>
  )
}