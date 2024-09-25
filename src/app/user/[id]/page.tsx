import { Container } from '@/components/containers/container'
import { UserProfile } from '@/components/users/userProfile'
import type { Metadata } from 'next'

type Props = {
  params: {
    id: string
  }
}

export const generateMetadata = ({ params: { id } }: Props): Metadata => ({
  title: `User #${id}`,
})

export default function UserPage({ params: { id } }: Props) {
  return (
    <Container isCentered>
      <UserProfile id={id} />
    </Container>
  )
}
