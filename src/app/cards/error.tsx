'use client'
import { Container } from '@/components/containers/container'
export default function ErrorPage({ error }: { error: Error }) {
  return (
    <Container>
      <div>Ошибка чтения данных </div>
      <div>{error.message}</div>
    </Container>
  )
}
