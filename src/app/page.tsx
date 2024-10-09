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
    limit?: string
    orderBy?: string
    sortBy?: string
  }
}

// ToDo: README.md
export default function CardsPage({ searchParams }: Props) {
  return (
    <Container>
      <Cards
        search={searchParams?.search ?? ''}
        page={Number(searchParams?.page) || 1}
        limit={Number(searchParams?.limit) || 10}
        orderBy={searchParams?.orderBy ?? 'desc'}
        sortBy={searchParams?.sortBy ?? 'createdAt'}
      />
    </Container>
  )
}
