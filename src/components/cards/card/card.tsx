import type { CardModel } from '@/api/cards/cards.types'
import { CardContent } from '@/components/cards/card/cardContent'
import { CardActionBar } from '@/components/cards/cardActionBar'
import { Block, type BlockProps } from '@/components/containers/block'
import { cardsModeStore } from '@/stores/cardsModeStore'
import { cn } from '@/utils/mergeClasses'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'

type Props = {
  card: CardModel
  isOpen?: boolean
  isCardToSpeech?: boolean
  setCardToSpeech?: (card: CardModel) => void
  isCardPlaying?: boolean
  pagePosition?: number
} & ComponentPropsWithoutRef<'article'> &
  Pick<BlockProps, 'inColumns'>

// ToDo: Uncategorized
export const Card = ({
  card,
  isOpen,
  isCardToSpeech,
  setCardToSpeech,
  isCardPlaying,
  pagePosition,
  className,
  ...restProps
}: Props) => {
  const { isStudyMode } = cardsModeStore()
  const [showContent, setShowContent] = useState(isStudyMode)

  const { title, content } = card

  useEffect(() => setShowContent(isStudyMode), [isStudyMode])

  return (
    <Block
      as='article'
      heading={title}
      isConstrained={showContent}
      className={cn(
        isCardToSpeech &&
          'shadow-inner outline outline-2 outline-accent dark:outline-accent-dark',
        className,
      )}
      {...restProps}
    >
      {showContent && <CardContent content={content} />}
      <CardActionBar
        card={card}
        isOpen={isOpen}
        setCardToSpeech={setCardToSpeech}
        isCardPlaying={isCardPlaying}
        pagePosition={pagePosition}
        showContent={showContent}
        setShowContent={setShowContent}
      />
    </Block>
  )
}
