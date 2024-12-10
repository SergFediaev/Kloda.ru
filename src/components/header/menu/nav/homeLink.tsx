import { House } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const HOME_PAGE = '/'

export const HomeLink = () =>
  usePathname() !== HOME_PAGE ? (
    <Link href={HOME_PAGE} title='Home'>
      <House />
    </Link>
  ) : null
