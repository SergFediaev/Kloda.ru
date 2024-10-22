import { Button } from '@/components/button'
import { Input } from '@/components/forms/input'
import { useGetCategories } from '@/hooks/useCategories'
import { Select, SelectItem } from '@nextui-org/select'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { type ChangeEvent, useCallback, useEffect } from 'react'

const PAGE_PARAM = 'page'
const CATEGORIES_PARAM = 'categories'

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

// ToDo: string[]
const QUANTITIES = [5, 10, 15, 20, 25, 30, 50, 70, 100] as const

const setFirstPage = (params: URLSearchParams) =>
  params.set(PAGE_PARAM, String(1))

type Key = typeof PAGE_PARAM | 'limit' | 'order' | 'sort'

type Props = {
  itemsName?: string
  page: number
  limit: number
  order: string
  sort: string
  sorts: Record<string, string>
  selectedCategories: string[]
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
  selectedCategories,
  totalItems,
  totalPages,
  itemsCount,
}: Props) => {
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { data, isPending } = useGetCategories() // ToDo: Handle error

  const categories = data ?? []
  const isLastPage = page === totalPages
  const hasSearchParams = searchParams.toString() !== ''
  const hasNotItems = itemsCount < 2
  const hasNotPages = page < 2
  const hasNotTotalPages = totalPages < 2
  const hasNotCategories = data?.length === 0

  const onChangeParams = useCallback(
    (key: Key, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (key === 'limit') setFirstPage(params)

      params.set(key, value)
      replace(`?${params}`)
    },
    [searchParams, replace],
  )

  const onChangePage = useCallback(
    (pageNumber: number, event?: KeyboardEvent) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        event?.preventDefault()
        onChangeParams(PAGE_PARAM, String(pageNumber))
      }
    },
    [totalPages, onChangeParams],
  )

  const onChangeCategories = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    const categories = value.split(',')
    const params = new URLSearchParams(searchParams)
    params.delete(CATEGORIES_PARAM)
    setFirstPage(params)

    for (const category of categories) {
      params.append(CATEGORIES_PARAM, category)
    }

    replace(`?${params}`)
  }

  const onReset = () => replace(pathname)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Home':
            onChangePage(1, event)
            break
          case 'ArrowLeft':
            onChangePage(page - 1, event)
            break
          case 'ArrowRight':
            onChangePage(page + 1, event)
            break
          case 'End':
            onChangePage(totalPages, event)
            break
          default: {
            const keyNumber = Number(event.key)

            if (!Number.isNaN(keyNumber)) onChangePage(keyNumber, event)
          }
        }
      }
    }

    addEventListener('keydown', onKeyDown)
    return () => removeEventListener('keydown', onKeyDown)
  }, [page, totalPages, onChangePage])

  return (
    <div className='flex flex-wrap items-center justify-around gap-4 rounded-3xl border-2 border-accent bg-ground bg-opacity-70 p-6 shadow-inner backdrop-blur-xl dark:border-accent-dark dark:bg-ground-dark dark:bg-opacity-70'>
      <Button
        variant='round'
        onClick={() => onChangePage(1)}
        disabled={hasNotPages}
        title='Ctrl + Home'
      >
        <ChevronFirst />
      </Button>
      <Button
        variant='round'
        onClick={() => onChangePage(page - 1)}
        disabled={hasNotPages}
        title='Ctrl + Left arrow'
      >
        <ChevronLeft />
      </Button>
      <span className='text-center'>
        <p>Pages</p>
        <p>
          {page} / {totalPages}
        </p>
      </span>
      <Button
        variant='round'
        onClick={() => onChangePage(page + 1)}
        disabled={isLastPage}
        title='Ctrl + Right arrow'
      >
        <ChevronRight />
      </Button>
      <Button
        variant='round'
        onClick={() => onChangePage(totalPages)}
        disabled={isLastPage}
        title='Ctrl + End'
      >
        <ChevronLast />
      </Button>
      <Input
        label='Go to page'
        value={page}
        type='number'
        min={1}
        max={totalPages}
        onChange={({ currentTarget: { value } }) => onChangePage(Number(value))}
        disabled={hasNotTotalPages}
        title='Ctrl + Page number'
      />
      <span className='text-center'>
        <p>{itemsName}</p>
        <p>
          {itemsCount} / {totalItems}
        </p>
      </span>
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        className='w-auto min-w-36'
        color='warning'
        isDisabled={hasNotItems}
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
      <Select
        label='Order by'
        selectedKeys={[order]}
        onChange={({ target: { value } }) => onChangeParams('order', value)}
        className='w-auto min-w-36'
        color='warning'
        items={Object.entries(ORDERS)}
        isDisabled={hasNotItems}
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
        isDisabled={hasNotItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      <Select
        label='Categories'
        selectedKeys={selectedCategories}
        onChange={onChangeCategories}
        className='w-auto min-w-36'
        color='warning'
        placeholder='All'
        isDisabled={hasNotCategories}
        selectionMode='multiple'
        isLoading={isPending}
        items={categories}
      >
        {({ name, displayName, cardsCount }) => (
          <SelectItem
            key={name}
            value={name}
            textValue={`${displayName} (${cardsCount})`}
          >
            {displayName}&nbsp;({cardsCount})
          </SelectItem>
        )}
      </Select>
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}
