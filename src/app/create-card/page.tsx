import { CreateCardModal } from '@/components/cards/card/createCardModal'
import { Container } from '@/components/containers/container'
import type { Metadata } from 'next'

const title = 'Create card'

export const metadata: Metadata = {
  title,
}

export default function CreateCardPage() {
  return (
    <Container isCentered>
      <CreateCardModal heading={title} />
    </Container>
  )
}
