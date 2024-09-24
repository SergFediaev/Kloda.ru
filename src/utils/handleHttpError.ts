import type { HTTPError } from 'ky'

export const handleHttpError = async (error: HTTPError): Promise<string> => {
  const response = error.response
  const errorText = await response.text()

  try {
    const errorBody = JSON.parse(errorText)

    return errorBody.message ?? 'Something went wrong'
  } catch {
    return errorText
  }
}
