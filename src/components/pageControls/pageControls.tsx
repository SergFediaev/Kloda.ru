'use client'

import { Button } from '@/components/buttons/button'
import {
  ItemsPerPage,
  type Key,
  Pagination,
  SelectorsGroup,
} from '@/components/pageControls'
import { usePaths } from '@/hooks/usePaths'
import { setFirstPage } from '@/utils/setFirstPage'
import { useTransitionRouter } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'
import { type ReactNode, useCallback } from 'react'

export const USERS_DEFAULT_PARAMS: UsersSearchParams = {
  search: '',
  page: '1',
  limit: '10',
  order: 'desc',
  sort: 'registeredAt',
} as const

export const CARDS_DEFAULT_PARAMS: CardsSearchParams = {
  search: '',
  page: '1',
  limit: '10',
  order: 'desc',
  sort: 'createdAt',
  categories: [],
  userId: '',
  action: '',
} as const

export type UsersSearchParams = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
}

export type CardsSearchParams = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
  categories: string | string[]
  userId: string
  action: string
}

type Props = {
  totalPages: number
  totalUsers?: number
  totalCards?: number
  currentItems: number
  radioGroup: ReactNode
}

export const PageControls = ({
  totalPages,
  totalUsers,
  totalCards,
  currentItems,
  radioGroup,
}: Props) => {
  const { pathname, isUsersPath, isCardsPath } = usePaths()
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const currentParams = {
    ...(isUsersPath ? USERS_DEFAULT_PARAMS : CARDS_DEFAULT_PARAMS),
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
    <div className='flex flex-col items-center justify-around gap-x-3'>
      <div className='flex items-center justify-start gap-x-3'>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChangeParams={onChangeParams}
        />
        <ItemsPerPage
          itemsName={itemsName}
          totalItems={isUsersPath ? totalUsers : totalCards}
          currentItems={currentItems}
        />
      </div>
      <div className='flex flex-wrap items-center justify-start gap-x-3 py-3'>
        <SelectorsGroup
          itemsName={isUsersPath ? 'Users' : 'Cards'}
          {...restParams}
          onChangeParams={onChangeParams}
          currentItems={currentItems}
          totalItems={isUsersPath ? totalUsers : totalCards}
        />
        {radioGroup}
        {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
      </div>
    </div>
  )
}