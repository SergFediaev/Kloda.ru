import type { UserResponse } from '@/api/users/users.types'
import ky from 'ky'

const usersApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/users`,
})

export const getUsers = () => usersApi<UserResponse[]>('').json()

export const getUser = (id: string) => usersApi<UserResponse[]>(id).json()
