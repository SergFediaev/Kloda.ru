import { Cards } from '@/components/cards/cards'
import { Container } from '@/components/containers/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards | Kloda',
}

// ToDo: README.md
export default function CardsPage() {
  return (
    <Container>
      <Cards />
    </Container>
  )
}
