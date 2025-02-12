import { Button } from '@/components/buttons/button'
import { useTransitionRouter } from 'next-view-transitions'

type Props = {
  cardId: string
  isOpen?: boolean
}

export const FocusCard = ({ cardId, isOpen }: Props) => {
  const router = useTransitionRouter()

  const cardDetailsText = isOpen ? 'Close focus view' : 'Open focus view'

  const handleFocus = () => {
    !isOpen ? router.push(`/card/${cardId}`) : router.back()
  }

  return (
    <Button variant='primary' onClick={handleFocus}>
      {cardDetailsText}
    </Button>
  )
}
