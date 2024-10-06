import { CircleUser } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

type Props = {
  isUserLoggedIn: boolean
  loggedInUserId?: number
}

export const ProfileLink = ({ isUserLoggedIn, loggedInUserId }: Props) => {
  if (!isUserLoggedIn || !loggedInUserId) {
    return null
  }

  const userPage = `/user/${loggedInUserId}`

  return usePathname() !== userPage ? (
    <Link href={userPage} title='Profile'>
      <CircleUser />
    </Link>
  ) : null
}
