'use client'

import { ErrorMessage } from '@/components/errorMessage'
import { useGetCategories } from '@/hooks/useCategories'
import { usePaths } from '@/hooks/usePaths'
import { useThemes } from '@/hooks/useThemes'
import { useWidth } from '@/hooks/useWidth'
import { cn } from '@/utils/mergeClasses'
import { setFirstPage } from '@/utils/setFirstPage'
import { sortCategories } from '@/utils/sortCategories'
import { useRouter, useSearchParams } from 'next/navigation'
import Select, { components } from 'react-select'
import colors from 'tailwindcss/colors'

const CATEGORIES_PARAM = 'categories'
const ALL_CATEGORIES = 'All'
const COLOR_ACCENT = '#f15b00'
const COLOR_ACCENT_DARK = '#ff8800'

const CustomPlaceholder = (props: any) => (
  <components.Placeholder {...props}>
    <div className='flex flex-col gap-0.5'>
      <span className='text-[#545459] text-xs dark:text-primary-dark'>
        Categories (cards)
      </span>
      <span className='text-black text-sm dark:text-primary-dark '>
        {props.children}
      </span>
    </div>
  </components.Placeholder>
)

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

  // noinspection JSUnusedGlobalSymbols
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
          borderRadius: '12px',
          height: '70px',
          minHeight: '70px',
        }),
        option: (baseStyles, { isFocused }) => ({
          ...baseStyles,
          color: isFocused ? colors.white : baseStyles.color,
        }),
        multiValueRemove: baseStyles => ({
          ...baseStyles,
          color: 'white',
        }),
        menu: baseStyles => ({
          ...baseStyles,
          zIndex: '100',
        }),
        clearIndicator: baseStyles => ({
          ...baseStyles,
          color: COLOR_ACCENT_DARK,
          '&:hover': {
            color: 'gray',
          },
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: baseStyles => ({
          ...baseStyles,
          paddingRight: '15px',
          color: COLOR_ACCENT_DARK,
          '&:hover': {
            color: COLOR_ACCENT_DARK,
          },
        }),
      }}
      components={{ Placeholder: CustomPlaceholder }}
      theme={theme => ({
        ...theme,
        colors: {
          ...theme.colors,
          neutral0: isDarkTheme ? colors.stone['950'] : colors.white, // Select BG
          neutral10: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Selected option BG
          neutral20: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Select border
          neutral80: isDarkTheme ? colors.stone['50'] : colors.white, // Selected option text
          primary: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Focus select outline
          primary25: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Hover option BG
          primary50: isDarkTheme ? COLOR_ACCENT_DARK : COLOR_ACCENT, // Active option BG
        },
      })}
    />
  )
}