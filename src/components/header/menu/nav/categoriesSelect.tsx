import { ErrorMessage } from '@/components/errorMessage'
import { useGetCategories } from '@/hooks/useCategories'
import { usePaths } from '@/hooks/usePaths'
import { useThemes } from '@/hooks/useThemes'
import { useWidth } from '@/hooks/useWidth'
import { cn } from '@/utils/mergeClasses'
import { setFirstPage } from '@/utils/setFirstPage'
import { sortCategories } from '@/utils/sortCategories'
import { useRouter, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import colors from 'tailwindcss/colors'

const CATEGORIES_PARAM = 'categories'
const ALL_CATEGORIES = 'All categories'
const COLOR_ACCENT = '#f15b00'
const COLOR_ACCENT_DARK = '#ff8800'

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

  if (usePaths().isNotCardablePath) {
    return null
  }

  const categories = data ?? []
  const categoriesSorted = sortCategories(categories)
  const hasNotCategories = data?.length === 0
  const selectedCategories = searchParams.getAll('categories')

  const placeholder = isPending
    ? 'Loading categories'
    : isSuccess
      ? `${ALL_CATEGORIES} (${data.length})`
      : ALL_CATEGORIES

  const options: Options = categoriesSorted.map(
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
        option: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          color: isFocused ? colors.stone['50'] : baseStyles.color, // Color of text on Option in focus (during hover)
        }),
        multiValueRemove: baseStyles => ({
          ...baseStyles,
          color: colors.stone['50'], // Color of cancelling X in selected Options in multi-select
        }),
      }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isDarkTheme ? colors.stone['950'] : colors.stone['50'], // Select BG
          neutral10: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Selected option BG
          neutral20: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Select border
          neutral80: isDarkTheme ? colors.stone['50'] : colors.stone['50'], // Selected option text
          primary: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Focus select outline
          primary25: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Hover option BG
          primary50: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Active option BG
        },
      })}
    />
  )
}
