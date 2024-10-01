import { Cards } from '@/components/cards/cards'
import { Container } from '@/components/containers/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards | Kloda',
}

type Props = {
  searchParams?: {
    search?: string
    page?: string
  }
}

// ToDo: README.md
export default function CardsPage({ searchParams }: Props) {
  const search = searchParams?.search ?? ''
  const page = Number(searchParams?.page) || 1

  return (
    <Container>
      <Cards search={search} page={page} />
    </Container>
  )
}
