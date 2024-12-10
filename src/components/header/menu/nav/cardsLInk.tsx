import { LayoutDashboard } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const CARDS_PAGE = '/cards'

export const CardsLink = () =>
  usePathname() !== CARDS_PAGE ? (
    <Link href={CARDS_PAGE} title='Cards'>
      <LayoutDashboard />
    </Link>
  ) : null
