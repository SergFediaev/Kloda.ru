import { EditCardModal } from '@/components/cards/card/editCardModal'
import { Container } from '@/components/containers/container'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id },
}: ParamsIdProps): Metadata => ({
  title: `Edit card #${id}`,
})

export default function EditCardPage({ params: { id } }: ParamsIdProps) {
  return (
    <Container isCentered>
      <EditCardModal heading={`Edit card #${id}`} id={id} />
    </Container>
  )
}