import { Button } from '@/components/buttons/button'
import type { CollapseMenuProps } from '@/components/header/menu/desktopMenu'
import { ChevronUp } from 'lucide-react'

export const MenuButton = ({ collapseMenu }: CollapseMenuProps) => (
  <Button variant='text' onClick={collapseMenu} title='Collapse menu'>
    <ChevronUp />
  </Button>
)
