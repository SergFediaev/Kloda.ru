'use client'

import { useThemes } from '@/hooks/useThemes'
import HolyLoader from 'holy-loader'
import colors from 'tailwindcss/colors'

export const LoaderBar = () => {
  const { isDarkTheme } = useThemes()

  const shadowColorFirst = isDarkTheme
    ? colors.orange['700']
    : colors.orange['200']

  const shadowColorSecond = isDarkTheme
    ? colors.orange['800']
    : colors.orange['300']

  return (
    <HolyLoader
      color={isDarkTheme ? colors.orange['400'] : colors.orange['600']}
      boxShadow={`0 0 10px ${shadowColorFirst}, 0 0 5px ${shadowColorSecond}`}
      showSpinner
    />
  )
}
