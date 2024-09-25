import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { CardForm } from '@/components/forms/cardForm'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'

const title = 'Create card'

export const metadata: Metadata = {
  title,
}

export default function CreateCardPage() {
  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-xl'
      >
        <CardForm />
        <ReturnToCards />
      </Block>
    </Container>
  )
}
