import { CardDetails } from '@/components/cards/card/cardDetails'
import { Container } from '@/components/containers/container'
import { CardPageControls } from '@/components/pageControls'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id },
}: ParamsIdProps): Metadata => ({
  title: `Card #${id}`,
})

export default function CardPage({ params: { id } }: ParamsIdProps) {
  return (
    <Container isCentered className='flex-col justify-start'>
      <CardPageControls />
      <CardDetails id={id} />
    </Container>
  )
}