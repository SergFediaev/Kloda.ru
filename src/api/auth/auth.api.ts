import type { RegisterArgs, RegisterResponse } from '@/api/auth/auth.types'
import { handleHttpError } from '@/utils/handleHttpError'
import ky, { HTTPError } from 'ky'

const authApi = ky.create({
  prefixUrl: 'https://api.kloda.fediaev.ru/v1/auth',
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
