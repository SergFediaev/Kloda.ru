import { Button } from '@/components/button'
import { Select } from '@/components/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

const QUANTITIES = [5, 10, 15, 20, 25, 30, 50, 70, 100] as const

type Key = 'page' | 'limit' | 'orderBy' | 'sortBy'

type Props = {
  itemsName?: string
  page: number
  limit: number
  orderBy: string
  sortBy: string
  sorts: Record<string, string>
  totalItems: number
  totalPages: number
}

export const Pagination = ({
  itemsName = 'Items',
  page,
  limit,
  orderBy,
  sortBy,
  sorts,
  totalItems,
  totalPages,
}: Props) => {
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()

  const hasPages = page > 1
  const isNotLastPage = page < totalPages

  const onChangeParams = (key: Key, value: string) => {
    const params = new URLSearchParams(searchParams)

    if (key === 'limit') params.set('page', String(1))

    params.set(key, value)
    replace(`?${params}`)
  }

  const onChangePage = (page: number) => onChangeParams('page', String(page))

  return (
    <div className='flex flex-wrap items-center justify-around gap-4 rounded-3xl border-2 border-accent bg-ground bg-opacity-70 p-6 shadow-inner backdrop-blur-xl dark:border-accent-dark dark:bg-ground-dark dark:bg-opacity-70'>
      <span className='text-center'>
        <p>{itemsName}</p>
        <p>{totalItems}</p>
      </span>
      {hasPages && (
        <>
          <Button variant='round' onClick={() => onChangePage(1)}>
            1
          </Button>
          <Button variant='round' onClick={() => onChangePage(page - 1)}>
            <ChevronLeft />
          </Button>
        </>
      )}
      <span className='text-center'>
        <p>Pages</p>
        <p>
          {page} / {totalPages}
        </p>
      </span>
      {isNotLastPage && (
        <>
          <Button variant='round' onClick={() => onChangePage(page + 1)}>
            <ChevronRight />
          </Button>
          <Button variant='round' onClick={() => onChangePage(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
      <Select
        label='Order by'
        value={orderBy}
        onChange={({ currentTarget: { value } }) =>
          onChangeParams('orderBy', value)
        }
      >
        {Object.entries(ORDERS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Select
        label='Sort by'
        value={sortBy}
        onChange={({ currentTarget: { value } }) =>
          onChangeParams('sortBy', value)
        }
      >
        {Object.entries(sorts).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      <Select
        label={`${itemsName} per page`}
        value={limit}
        onChange={({ currentTarget: { value } }) =>
          onChangeParams('limit', value)
        }
      >
        {QUANTITIES.map(quantity => (
          <option key={quantity} value={quantity}>
            {quantity}
          </option>
        ))}
      </Select>
    </div>
  )
}
