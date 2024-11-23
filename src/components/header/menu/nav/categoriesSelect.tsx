import { ErrorMessage } from '@/components/errorMessage'
import { useGetCategories } from '@/hooks/useCategories'
import { usePaths } from '@/hooks/usePaths'
import { useThemes } from '@/hooks/useThemes'
import { useWidth } from '@/hooks/useWidth'
import { cn } from '@/utils/mergeClasses'
import { setFirstPage } from '@/utils/setFirstPage'
import { useRouter, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import colors from 'tailwindcss/colors'

const CATEGORIES_PARAM = 'categories'
const ALL_CATEGORIES = 'All categories'

type Options = readonly {
  label: string
  value: string
}[]

// ToDo: Refactor select theme custom colors
export const CategoriesSelect = () => {
  const { data, isPending, isSuccess, isError, error } = useGetCategories()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { isDarkTheme } = useThemes()
  const { isDesktopWidth } = useWidth()

  if (usePaths().isNotCardsPath) {
    return null
  }

  const categories = data ?? []
  const hasNotCategories = data?.length === 0
  const selectedCategories = searchParams.getAll('categories')

  const placeholder = isPending
    ? 'Loading categories'
    : isSuccess
      ? `${ALL_CATEGORIES} (${data.length})`
      : ALL_CATEGORIES

  const options: Options = categories.map(
    ({ name, displayName, cardsCount }) => ({
      label: `${displayName} (${cardsCount})`,
      value: name,
    }),
  )

  const selectedOptions: Options = options.filter(({ value }) =>
    selectedCategories.includes(value),
  )

  const onChangeCategories = (categories: Options) => {
    const params = new URLSearchParams(searchParams)
    params.delete(CATEGORIES_PARAM)
    setFirstPage(params)

    for (const { value } of categories) {
      params.append(CATEGORIES_PARAM, value)
    }

    replace(`?${params}`)
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  return (
    <Select
      value={selectedOptions}
      options={options}
      onChange={onChangeCategories}
      placeholder={placeholder}
      isDisabled={hasNotCategories}
      isLoading={isPending}
      isMulti
      isSearchable
      isClearable
      className={cn(isDesktopWidth ? 'min-w-52' : 'min-w-0')}
      styles={{
        control: baseStyles => ({
          ...baseStyles,
          borderWidth: '2px',
        }),
      }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isDarkTheme ? colors.neutral['950'] : colors.neutral['50'], // Select BG
          neutral10: isDarkTheme ? colors.orange['800'] : colors.orange['200'], // Selected option BG
          neutral20: isDarkTheme ? colors.orange['400'] : colors.orange['600'], // Select border
          neutral80: isDarkTheme ? colors.neutral['50'] : colors.neutral['950'], // Selected option text
          primary: isDarkTheme ? colors.orange['400'] : colors.orange['600'], // Focus select outline
          primary25: isDarkTheme ? colors.orange['800'] : colors.orange['200'], // Hover option BG
          primary50: isDarkTheme ? colors.orange['700'] : colors.orange['300'], // Active option BG
        },
      })}
    />
  )
}
