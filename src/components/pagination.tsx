import { Button } from '@/components/button'
import { Select, SelectItem } from '@nextui-org/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { useSearchParams } from 'next/navigation'

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

// ToDo: string[]
const QUANTITIES = [5, 10, 15, 20, 25, 30, 50, 70, 100] as const

type Key = 'page' | 'limit' | 'order' | 'sort'

type Props = {
  itemsName?: string
  page: number
  limit: number
  order: string
  sort: string
  sorts: Record<string, string>
  totalItems: number
  totalPages: number
  itemsCount: number
}

export const Pagination = ({
  itemsName = 'Items',
  page,
  limit,
  order,
  sort,
  sorts,
  totalItems,
  totalPages,
  itemsCount,
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
        <p>
          {itemsCount} / {totalItems}
        </p>
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
        selectedKeys={[order]}
        onChange={({ target: { value } }) => onChangeParams('order', value)}
        className='w-auto min-w-36'
        color='warning'
        items={Object.entries(ORDERS)}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label='Sort by'
        selectedKeys={[sort]}
        onChange={({ target: { value } }) => onChangeParams('sort', value)}
        className='w-auto min-w-36'
        color='warning'
        items={Object.entries(sorts)}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        className='w-auto min-w-36'
        color='warning'
      >
        {QUANTITIES.map(quantity => (
          <SelectItem
            key={quantity}
            value={quantity}
            textValue={String(quantity)}
          >
            {quantity}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
