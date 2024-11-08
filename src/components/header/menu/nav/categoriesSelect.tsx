import { useGetCategories } from '@/hooks/useCategories'
import { usePaths } from '@/hooks/usePaths'
import { useWidth } from '@/hooks/useWidth'
import { setFirstPage } from '@/utils/setFirstPage'
import { Select, SelectItem } from '@nextui-org/select'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'

const CATEGORIES_PARAM = 'categories'

export const CategoriesSelect = () => {
  const { data, isPending } = useGetCategories() // ToDo: Handle error
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { isDesktopWidth } = useWidth()

  if (usePaths().isNotCardsPath) {
    return null
  }

  const categories = data ?? []
  const hasNotCategories = data?.length === 0
  const selectedCategories = searchParams.getAll('categories')

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

  return (
    <Select
      label='Categories'
      selectedKeys={selectedCategories}
      onChange={onChangeCategories}
      className='items-center sm:w-auto sm:min-w-40 sm:max-w-56'
      color='warning'
      placeholder='All'
      isDisabled={hasNotCategories}
      selectionMode='multiple'
      isLoading={isPending}
      items={categories}
      labelPlacement={isDesktopWidth ? 'outside-left' : 'inside'}
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
  )
}
