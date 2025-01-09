import type { Categories } from '@/api/categories/categories.types'

export const sortCategories = (categories: Categories[]) => {
  return [...categories].sort((a, b) =>
    a.displayName.localeCompare(b.displayName, undefined, {
      sensitivity: 'base',
    }),
  )
}
