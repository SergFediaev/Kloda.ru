import type { UserResponse } from '@/api/users/users.types'
import ky from 'ky'

const usersApi = ky.create({
  prefixUrl: 'https://api.kloda.fediaev.ru/v1/users',
})

export const getUsers = () => usersApi<UserResponse[]>('').json()

export const getUser = (id: string) => usersApi<UserResponse[]>(id).json()
