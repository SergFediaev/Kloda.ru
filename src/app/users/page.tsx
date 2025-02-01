import { Container } from '@/components/containers/container'
import {
  USERS_DEFAULT_PARAMS,
  type UsersSearchParams,
} from '@/components/displayOptions/usersPageControls'
import { Users } from '@/components/users/users'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users',
}

type Props = {
  searchParams?: UsersSearchParams
}

export default function UsersPage({ searchParams }: Props) {
  return (
    <Container>
      <Users {...USERS_DEFAULT_PARAMS} {...searchParams} />
    </Container>
  )
}