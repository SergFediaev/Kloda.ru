import { Users } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const USERS_PAGE = '/users'

export const UsersLink = () =>
  usePathname() !== USERS_PAGE ? (
    <Link href={USERS_PAGE} title='Users'>
      <Users />
    </Link>
  ) : null
