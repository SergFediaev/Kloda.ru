'use client'

import { Button } from '@/components/buttons/button'
import { ItemsPerPage } from '@/components/displayOptions/itemsPerPage'
import { type Key, Pagination } from '@/components/displayOptions/pagination'
import { SelectorsGroup } from '@/components/displayOptions/selectorsGroup'
import { usePaths } from '@/hooks/usePaths'
import { setFirstPage } from '@/utils/setFirstPage'
import { useTransitionRouter } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const USERS_DEFAULT_PARAMS: Readonly<UsersSearchParams> = {
  search: '',
  page: '1',
  limit: '10',
  order: 'desc',
  sort: 'registeredAt',
} as const

export type UsersSearchParams = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
}

type Props = {
  totalPages: number
  totalUsers: number
  numberOfCurrentItems: number
  radioGroup: JSX.Element
}

export const UsersPageControls = ({
  totalPages,
  totalUsers,
  numberOfCurrentItems,
  radioGroup,
}: Props) => {
  const { pathname, isUsersPath, isCardsPath } = usePaths()

  const { replace } = useTransitionRouter()

  const searchParams = useSearchParams()

  const currentParams = {
    ...USERS_DEFAULT_PARAMS,
    ...Object.fromEntries(searchParams.entries()),
  }

  const { page, search, ...restParams } = currentParams

  const hasSearchParams = searchParams.toString() !== ''

  const itemsName = isUsersPath ? 'Users' : isCardsPath ? 'Cards' : 'Items'

  const onReset = () => replace(pathname)

  const onChangeParams = useCallback(
    (key: Key, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (key === 'limit') setFirstPage(params)

      params.set(key, value)
      replace(`?${params}`)
    },
    [searchParams, replace],
  )

  return (
    <div className='flex items-center justify-around gap-3'>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChangeParams={onChangeParams}
      />
      <ItemsPerPage
        itemsName={itemsName}
        totalItems={totalUsers}
        currentItems={numberOfCurrentItems}
      />
      <SelectorsGroup
        itemsName={isUsersPath ? 'Users' : 'Cards'}
        {...restParams}
        onChangeParams={onChangeParams}
        currentItems={numberOfCurrentItems}
      />
      {radioGroup}
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}