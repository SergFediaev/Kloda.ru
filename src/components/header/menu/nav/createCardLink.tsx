import { Button } from '@/components/buttons/button'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import type { LoggedInProps } from '@/components/header/menu/desktopMenu'
import { usePaths } from '@/hooks/usePaths'
import { FilePlus } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { useState } from 'react'

const TITLE = 'Create card'

export const CreateCardLink = ({ isLoggedIn }: LoggedInProps) => {
  const { createCardPath, isCreateCardPath } = usePaths()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const icon = <FilePlus />
  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  return isLoggedIn ? (
    <Button
      as={Link}
      variant='text'
      href={createCardPath}
      title={TITLE}
      isDisabled={isCreateCardPath}
    >
      {icon}
    </Button>
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
