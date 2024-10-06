import { Button } from '@/components/button'
import { ChevronUp } from 'lucide-react'

type Props = {
  collapseMenu: () => void
}

export const MenuButton = ({ collapseMenu }: Props) => (
  <Button variant='text' onClick={collapseMenu} title='Collapse menu'>
    <ChevronUp />
  </Button>
)
