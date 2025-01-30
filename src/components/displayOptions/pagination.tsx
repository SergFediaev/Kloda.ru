import { Button } from '@/components/buttons/button'
import type { ColumnsCount } from '@/components/containers/columns'
import { Text } from '@/components/containers/text'
import { ColumnsRadio } from '@/components/displayOptions/columnsRadio'
import { Select } from '@/components/select'
import { useWidth } from '@/hooks/useWidth'
import { setFirstPage } from '@/utils/setFirstPage'
import { Pagination as NextUiPagination } from '@nextui-org/pagination'
import { SelectItem } from '@nextui-org/select'
import { useTransitionRouter } from 'next-view-transitions'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'

const ORDERS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const

// ToDo: string[]
const QUANTITIES = [5, 10, 20, 50, 100] as const

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
  const lowNumberItems = itemsCount < 2
  const lowNumberPages = totalPages < 2

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
        isDisabled={lowNumberPages}
        classNames={{
          wrapper: 'flex-wrap',
          cursor: 'bg-accent dark:bg-accent-dark text-white',
        }}
        showControls={isDesktopWidth}
        loop
        isCompact
        showShadow
      />
      <Text isCentered>
        <p>{itemsName}</p>
        <p>
          {itemsCount} / {totalItems}
        </p>
      </Text>
      <Select
        label={`${itemsName} per page`}
        selectedKeys={[String(limit)]}
        onChange={({ target: { value } }) => onChangeParams('limit', value)}
        isDisabled={lowNumberItems}
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
        isDisabled={lowNumberItems}
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
        isDisabled={lowNumberItems}
      >
        {([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )}
      </Select>
      {isDesktopWidth && (
        <ColumnsRadio
          columnsCount={columnsCount}
          setColumnsCount={setColumnsCount}
        />
      )}
      {hasSearchParams && <Button onClick={onReset}>Reset</Button>}
    </div>
  )
}