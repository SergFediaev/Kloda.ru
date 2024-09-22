import { CardDetails } from '@/components/cardDetails'
import { Container } from '@/components/container'
import type { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

export const generateMetadata = ({ params: { id } }: Props): Metadata => ({
  title: `Card #${id}`,
})

export default function CardPage({ params: { id } }: Props) {
  return (
    <Container isCentered>
      <CardDetails id={id} />
    </Container>
  )
}
