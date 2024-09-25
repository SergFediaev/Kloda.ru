import { getUser, getUsers } from '@/api/users/users.api'
import { useQuery } from '@tanstack/react-query'

export const useGetUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

export const useGetUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })
