import type { CardModel } from '@/api/cards/cards.types'
import { Button } from '@/components/buttons/button'
import { cn } from '@/utils/mergeClasses'
import { Speech } from 'lucide-react'

type Props = {
  card: CardModel
  isCardPlaying?: boolean
  setCardToSpeech?: (card: CardModel) => void
}

export const PlayCard = ({ card, isCardPlaying, setCardToSpeech }: Props) => {
  if (!setCardToSpeech) {
    return null
  }

  const onCardToSpeech = () => setCardToSpeech(card)

  return (
    <Button variant='text' onClick={onCardToSpeech}>
      <Speech className={cn(isCardPlaying && 'animate-pulse')} />
    </Button>
  )
}
