import { Cards } from '@/components/cards'
import { Container } from '@/components/container'
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
