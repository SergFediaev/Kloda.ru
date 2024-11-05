import { CreateCard } from '@/components/cards/createCard'
import { Container } from '@/components/containers/container'
import type { Metadata } from 'next'

const title = 'Create card'

export const metadata: Metadata = {
  title,
}

export default function CreateCardPage() {
  return (
    <Container isCentered>
      <CreateCard heading={title} />
    </Container>
  )
}
