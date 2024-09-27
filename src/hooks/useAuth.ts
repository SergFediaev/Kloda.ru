import { login, logout, me, register } from '@/api/auth/auth.api'
import type { RegisterArgs, RegisterResponse } from '@/api/auth/auth.types'
import { getQueryClient } from '@/app/getQueryClient'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterArgs>({
    mutationFn: register,
    onSuccess: ({ accessToken }) =>
      localStorage.setItem('access_token', accessToken),
  })

export const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) =>
      localStorage.setItem('access_token', accessToken),
  })

export const useLogout = () =>
  useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem('access_token')
      void getQueryClient().invalidateQueries({ queryKey: ['me'] })
    },
  })

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: me,
    retry: false,
  })
