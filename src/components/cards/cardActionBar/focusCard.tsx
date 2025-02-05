import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import Link from 'next/link'

type Props = {
  cardId: string
  isOpen?: boolean
}
export const FocusCard = ({ cardId, isOpen }: Props) => {
  const { cardsPath } = usePaths()

  const cardDetailsLink = isOpen ? cardsPath : `/card/${cardId}`
  const cardDetailsText = isOpen ? 'Close focus view' : 'Open focus view'

  return (
    <Button
      as={Link}
      href={cardDetailsLink}
      className='bg-accent hover:bg-accent-dark hover:text-primary-dark dark:bg-accent-dark dark:hover:bg-accent'
    >
      {cardDetailsText}
    </Button>
  )
}