import { Button } from '@/components/buttons/button'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import type { LoggedInProps } from '@/components/header/menu/desktopMenu'
import { FilePlus } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const CREATE_CARD_PAGE = '/create-card'

const TITLE = 'Create card'

export const CreateCardLink = ({ isLoggedIn }: LoggedInProps) => {
  const pathname = usePathname()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (pathname === CREATE_CARD_PAGE) {
    return null
  }

  const icon = <FilePlus />
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return isLoggedIn ? (
    <Link href={CREATE_CARD_PAGE} title={TITLE}>
      {icon}
    </Link>
  ) : (
    <>
      <Button
        variant='text'
        onClick={openDialog}
        title={TITLE}
        isBlocked={!isLoggedIn}
      >
        {icon}
      </Button>
      <UnauthorizedDialog open={isDialogOpen} close={closeDialog} />
    </>
  )
}
