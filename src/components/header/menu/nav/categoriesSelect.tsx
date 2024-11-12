import { useGetCategories } from '@/hooks/useCategories'
import { usePaths } from '@/hooks/usePaths'
import { useThemes } from '@/hooks/useThemes'
import { setFirstPage } from '@/utils/setFirstPage'
import { useRouter, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import colors from 'tailwindcss/colors'

const CATEGORIES_PARAM = 'categories'

type Options = readonly {
  label: string
  value: string
}[]

// ToDo: Refactor select theme custom colors
export const CategoriesSelect = () => {
  const { data, isPending } = useGetCategories() // ToDo: Handle error
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const { isDarkTheme } = useThemes()

  if (usePaths().isNotCardsPath) {
    return null
  }

  const categories = data ?? []
  const hasNotCategories = data?.length === 0
  const selectedCategories = searchParams.getAll('categories')

  const options: Options = categories.map(
    ({ name, displayName, cardsCount }) => ({
      label: `${displayName} ${cardsCount}`,
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

  return (
    <Select
      defaultValue={selectedOptions}
      options={options}
      onChange={onChangeCategories}
      placeholder='All categories'
      isDisabled={hasNotCategories}
      isLoading={isPending}
      isMulti
      isSearchable
      isClearable
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isDarkTheme ? colors.neutral['950'] : colors.neutral['50'], // Select BG
          neutral10: isDarkTheme ? colors.orange['800'] : colors.orange['200'], // Selected option BG
          neutral20: isDarkTheme ? colors.orange['400'] : colors.orange['600'], // Select border
          neutral30: isDarkTheme ? colors.orange['300'] : colors.orange['700'], // Hover select border
          neutral80: isDarkTheme ? colors.neutral['50'] : colors.neutral['950'], // Selected option text
          primary: isDarkTheme ? colors.orange['400'] : colors.orange['600'], // Focus select outline
          primary25: isDarkTheme ? colors.orange['800'] : colors.orange['200'], // Hover option BG
          primary50: isDarkTheme ? colors.orange['700'] : colors.orange['300'], // Active option BG
        },
      })}
    />
  )
}
