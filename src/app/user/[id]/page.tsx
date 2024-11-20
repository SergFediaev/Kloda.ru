import { Container } from '@/components/containers/container'
import { UserProfile } from '@/components/users/userProfile'
import type { ParamsIdProps } from '@/types/paramsIdProps'
import type { Metadata } from 'next'

export const generateMetadata = ({
  params: { id },
}: ParamsIdProps): Metadata => ({
  title: `User #${id}`,
})

export default function UserPage({ params: { id } }: ParamsIdProps) {
  return (
    <Container isCentered>
      <UserProfile id={id} />
    </Container>
  )
}
