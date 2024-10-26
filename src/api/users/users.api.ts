import type {
  UserResponse,
  UsersArgs,
  UsersResponse,
} from '@/api/users/users.types'
import ky from 'ky'

const usersApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/users`,
})

export const getUsers = (searchParams: UsersArgs) =>
  usersApi<UsersResponse>('', { searchParams }).json()

export const getUser = (id: string) => usersApi<UserResponse>(id).json()
