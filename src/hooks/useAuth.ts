import { register } from '@/api/auth/auth.api'
import type { RegisterArgs, RegisterResponse } from '@/api/auth/auth.types'
import { useMutation } from '@tanstack/react-query'

export const useRegister = () =>
  useMutation<RegisterResponse, Error, RegisterArgs>({
    mutationFn: register,
    onSuccess: ({ accessToken }) =>
      localStorage.setItem('access_token', accessToken),
  })
