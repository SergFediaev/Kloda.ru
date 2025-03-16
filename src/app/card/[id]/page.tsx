import { CardDetails } from '@/components/cards/card/cardDetails'
import { Container } from '@/components/containers/container'
import { CardPageControls } from '@/components/pageControls'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id: cardId },
}: ParamsIdProps): Metadata => ({
  title: `Card #${cardId}`,
})

export default function CardPage({ params: { id: cardId } }: ParamsIdProps) {
  return (
    <Container isCentered className='flex-col justify-start'>
      <CardPageControls />
      <CardDetails cardId={cardId} />
    </Container>
  )
}