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

const DEFAULT_PARAMS = {
  search: '',
  page: '1',
  limit: '10',
  order: 'desc',
  sort: 'registeredAt',
} as const

export default function UsersPage({ searchParams }: Props) {
  return (
    <Container>
      <Users {...DEFAULT_PARAMS} {...searchParams} />
    </Container>
  )
}