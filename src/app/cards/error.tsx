'use client'

import { Container } from '@/components/containers/container'
import { useEffect } from 'react'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error)
  }, [error])
  return (
    <Container>
      <div>
        Ошибка получения данных
        <p>{error.message}</p>
      </div>
    </Container>
  )
}
