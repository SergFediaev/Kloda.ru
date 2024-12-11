import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import { LayoutDashboard } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const CardsLink = () => {
  const { cardsPath, isCardsPath } = usePaths()

  return (
    <Button
      as={Link}
      variant='text'
      href={cardsPath}
      title='Cards'
      isDisabled={isCardsPath}
    >
      <LayoutDashboard />
    </Button>
  )
}
