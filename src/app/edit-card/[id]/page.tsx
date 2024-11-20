import { EditCard } from '@/components/cards/editCard'
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
      <EditCard heading={`Edit card #${id}`} id={id} />
    </Container>
  )
}
