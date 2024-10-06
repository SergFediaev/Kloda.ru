import { SquarePen } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const CREATE_CARD_PAGE = '/create-card'

export const CreateCardLink = () =>
  usePathname() !== CREATE_CARD_PAGE ? (
    <Link href={CREATE_CARD_PAGE} title='Create card'>
      <SquarePen />
    </Link>
  ) : null
