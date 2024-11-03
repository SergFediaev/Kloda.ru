import type {
  LoginArgs,
  LoginResponse,
  RefreshResponse,
  RegisterArgs,
  RegisterResponse,
} from '@/api/auth/auth.types'
import type { UserResponse } from '@/api/users/users.types'
import { handleHttpError } from '@/utils/handleHttpError'
import { setHeadersAuth } from '@/utils/setHeadersAuth'
import ky, { HTTPError } from 'ky'

const authApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/auth`,
  credentials: 'include',
  hooks: {
    beforeRequest: [({ headers }) => setHeadersAuth(headers)],
    beforeRetry: [() => refresh()],
  },
  retry: {
    statusCodes: [401, 403],
  },
})

// ToDo: Handle errors
export const register = async (json: RegisterArgs) => {
  try {
    return await authApi.post<RegisterResponse>('register', { json }).json()
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorMessage = await handleHttpError(error)

      throw new Error(errorMessage)
    }

    throw error
  }
}

export const login = (json: LoginArgs) =>
  authApi.post<LoginResponse>('login', { json }).json()

export const logout = () => authApi.post('logout').json()

export const me = () => authApi<UserResponse>('me').json()

export const refresh = async () => {
  const { accessToken } = await authApi.post<RefreshResponse>('refresh').json()

  sessionStorage.setItem('access_token', accessToken)
}
