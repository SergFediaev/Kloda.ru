import type { Categories } from '@/api/categories/categories.types'
import ky from 'ky'

const categoriesApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/categories`,
})

export const getCategories = () => categoriesApi<Categories[]>('').json()
