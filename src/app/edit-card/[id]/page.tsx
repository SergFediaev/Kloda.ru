import { EditCardModal } from '@/components/cards/card/editCardModal'
import { Container } from '@/components/containers/container'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id: cardId },
}: ParamsIdProps): Metadata => ({
  title: `Edit card #${cardId}`,
})

export default function EditCardPage({
  params: { id: cardId },
}: ParamsIdProps) {
  return (
    <Container isCentered>
      <EditCardModal heading={`Edit card #${cardId}`} cardId={cardId} />
    </Container>
  )
}