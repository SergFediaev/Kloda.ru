import { Container } from '@/components/containers/container'
import { Users } from '@/components/users/users'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

export default function UsersPage() {
  return (
    <Container>
      <Users />
    </Container>
  )
}
