import { CardDetails } from '@/components/cards/cardDetails'
import { Container } from '@/components/containers/container'
import { DisplayOptions } from '@/components/displayOptions/displayOptions'
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
      <DisplayOptions />
      <CardDetails id={id} />
    </Container>
  )
}