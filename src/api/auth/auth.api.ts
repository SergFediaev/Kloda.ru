import type {
  LoginArgs,
  LoginResponse,
  RefreshResponse,
  RegisterArgs,
  RegisterResponse,
} from '@/api/auth/auth.types'
import type { UserResponse } from '@/api/users/users.types'
import { handleHttpError } from '@/utils/handleHttpError'
import ky, { HTTPError } from 'ky'

const authApi = ky.create({
  prefixUrl: 'https://api.kloda.fediaev.ru/v1/auth',
  credentials: 'include',
  hooks: {
    beforeRequest: [
      ({ headers }) => {
        const accessToken = localStorage.getItem('access_token')

        if (!accessToken) {
          return
        }

        headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
    beforeRetry: [() => refresh()],
  },
  retry: {
    statusCodes: [401, 403],
  },
})

export const register = async (json: RegisterArgs) => {
  try {
    return await authApi.post('register', { json }).json<RegisterResponse>()
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorMessage = await handleHttpError(error)

      throw new Error(errorMessage)
    }

    throw error
  }
}

export const login = (json: LoginArgs) =>
  authApi.post('login', { json }).json<LoginResponse>()

export const logout = () => authApi.post('logout').json()

export const me = () => authApi('me').json<UserResponse>()

export const refresh = async () => {
  const { accessToken } = await authApi.post('refresh').json<RefreshResponse>()

  localStorage.setItem('access_token', accessToken)
}
