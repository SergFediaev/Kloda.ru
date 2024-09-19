import { useId } from 'react'

export const useGenerateId = (id?: string, name?: string) => {
  if (id) {
    return id
  }

  const generatedId = useId()

  if (name) {
    return generatedId + name
  }

  return generatedId
}
