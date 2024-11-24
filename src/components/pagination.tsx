import { Button } from '@/components/buttons/button'
import type { ColumnsCount } from '@/components/containers/columns'
import { Radio } from '@/components/radio'
import { Select } from '@/components/select'
import { useWidth } from '@/hooks/useWidth'
import { setFirstPage } from '@/utils/setFirstPage'
import { Pagination as NextUiPagination } from '@nextui-org/pagination'
import { RadioGroup } from '@nextui-org/radio'
import { SelectItem } from '@nextui-org/select'
import { Columns2, Columns3, Rows4 } from 'lucide-react'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

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
  columnsCount: ColumnsCount
  setColumnsCount: (columnsCount: ColumnsCount) => void
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
  columnsCount,
  setColumnsCount,
}: Props) => {
  const { replace } = useTransitionRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { isDesktopWidth } = useWidth()

  const hasSearchParams = searchParams.toString() !== ''
  const hasNotItems = itemsCount < 2
  const hasNotPages = totalPages < 2

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
        onChangeParams('page', String(pageNumber))
      }
    },
    [totalPages, onChangeParams],
  )

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
    <div className='mx-auto mb-6 flex w-fit flex-wrap items-center justify-around gap-4'>
      <NextUiPagination
        page={page}
        total={totalPages}
        onChange={onChangePage}
        isDisabled={hasNotPages}
        classNames={{
          wrapper: 'flex-wrap',
          cursor: 'dark:bg-accent bg-accent-dark text-black dark:text-white',
        }}
        showControls={isDesktopWidth}
        loop
        isCompact
        showShadow
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
        items={Object.entries(sorts)}
        isDisabled={hasNotItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      {isDesktopWidth && (
        <RadioGroup
          label='Columns'
          orientation='horizontal'
          value={columnsCount}
          onValueChange={value => setColumnsCount(value as ColumnsCount)}
          className='text-center'
        >
          <Radio value='1' title='1'>
            <Rows4 />
          </Radio>
          <Radio value='2' title='2'>
            <Columns2 />
          </Radio>
          <Radio value='3' title='3'>
            <Columns3 />
          </Radio>
        </RadioGroup>
      )}
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}
