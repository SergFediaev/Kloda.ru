import { Button } from '@/components/buttons/button'
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
  const pathname = usePathname()

  if (!isLoggedIn || !userId) {
    return null
  }

  const userPage = `/user/${userId}`
  const isUserPage = pathname === userPage

  return (
    <Button
      as={Link}
      variant='text'
      href={userPage}
      title='Profile'
      isDisabled={isUserPage}
    >
      <CircleUser />
    </Button>
  )
}
