import type { LoggedInProps } from '@/components/header/menu/desktopMenu'
import { LogIn } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const LOGIN_PAGE = '/login'

export const LoginLink = ({ isLoggedIn }: LoggedInProps) =>
  usePathname() !== LOGIN_PAGE && !isLoggedIn ? (
    <Link href={LOGIN_PAGE} title='Login'>
      <LogIn />
    </Link>
  ) : null
