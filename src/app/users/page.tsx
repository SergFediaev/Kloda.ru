import { Container } from '@/components/containers/container'
import { Users } from '@/components/users/users'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

type Props = {
  searchParams?: {
    search?: string
    page?: string
    limit?: string
    order?: string
    sort?: string
  }
}

export default function UsersPage({ searchParams }: Props) {
  return (
    <Container>
      <Users
        search={searchParams?.search ?? ''}
        page={Number(searchParams?.page) || 1}
        limit={Number(searchParams?.limit) || 10}
        order={searchParams?.order ?? 'desc'}
        sort={searchParams?.sort ?? 'registeredAt'}
      />
    </Container>
  )
}
