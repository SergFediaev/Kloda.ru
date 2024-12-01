import type { Stats } from '@/api/stats/stats.types'
import ky from 'ky'

const statsApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/stats`,
})

export const getStats = () => statsApi<Stats>('').json()
