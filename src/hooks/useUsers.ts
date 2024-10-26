import { getUser, getUsers } from '@/api/users/users.api'
import type { UsersArgs } from '@/api/users/users.types'
import { useQuery } from '@tanstack/react-query'

export const useGetUsers = (args: UsersArgs) =>
  useQuery({
    queryKey: ['users', ...Object.values(args)],
    queryFn: () => getUsers(args),
  })

export const useGetUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })
