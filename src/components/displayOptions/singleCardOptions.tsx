'use client'

import { CardControl } from '@/components/header/menu/cardControl'
import { CategoriesSelect } from '@/components/header/menu/nav/categoriesSelect'
import { usePaths } from '@/hooks/usePaths'

export const SingleCardOptions = () => {
  const { isCardPath } = usePaths()

  if (!isCardPath) {
    return null
  }

  return (
    <div className='m-5 flex justify-start gap-10'>
      <CardControl />
      <CategoriesSelect />
    </div>
  )
}