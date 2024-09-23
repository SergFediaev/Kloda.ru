import { Block } from '@/components/block'
import { CardForm } from '@/components/cardForm'
import { Container } from '@/components/container'
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
