import { login, logout, me, register } from '@/api/auth/auth.api'
import type { RegisterArgs, RegisterResponse } from '@/api/auth/auth.types'
import { getQueryClient } from '@/app/getQueryClient'
import { invalidateCards } from '@/hooks/useCards'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterArgs>({
    mutationFn: register,
    onSuccess: ({ accessToken }) =>
      sessionStorage.setItem('access_token', accessToken),
  })

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      sessionStorage.setItem('access_token', accessToken)

      void invalidateCards(getQueryClient())
    },
  })

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
    onSuccess: () => {
      sessionStorage.removeItem('access_token')

      const queryClient = getQueryClient()
      void queryClient.invalidateQueries({ queryKey: ['me'] })
      void invalidateCards(getQueryClient())
    },
  })

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: me,
    retry: false,
  })
