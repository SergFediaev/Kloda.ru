import type {
  LoggedInProps,
  UserIdProps,
} from '@/components/header/menu/desktopMenu'
import { CircleUser } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

export const ProfileLink = ({
  isLoggedIn,
  userId,
}: LoggedInProps & UserIdProps) => {
  if (!isLoggedIn || !userId) {
    return null
  }

  const userPage = `/user/${userId}`

  return usePathname() !== userPage ? (
    <Link href={userPage} title='Profile'>
      <CircleUser />
    </Link>
  ) : null
}
