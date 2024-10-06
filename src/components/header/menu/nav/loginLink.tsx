import { LogIn } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const LOGIN_PAGE = '/login'

type Props = {
  isUserLoggedIn: boolean
}

export const LoginLink = ({ isUserLoggedIn }: Props) =>
  usePathname() !== LOGIN_PAGE && !isUserLoggedIn ? (
    <Link href={LOGIN_PAGE} title='Login'>
      <LogIn />
    </Link>
  ) : null
