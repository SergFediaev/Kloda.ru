import type { CardModel } from '@/api/cards/cards.types'
import {
  CardExtraData,
  CopyCard,
  DeleteCard,
  DislikeCard,
  EditCard,
  ExpandCard,
  FavorCard,
  FocusCard,
  LikeCard,
  PlayCard,
  ShareCard,
  ShowCard,
} from '@/components/cards/cardActionBar'

import { Wrapper } from '@/components/containers/wrapper'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import { useMe } from '@/hooks/useAuth'
import { usePaths } from '@/hooks/usePaths'
import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { useTheme } from 'next-themes'
import { useState } from 'react'

type Props = {
  card: CardModel
  isOpen?: boolean
  setCardToSpeech?: (card: CardModel) => void
  isCardPlaying?: boolean
  pagePosition?: number
  showContent: boolean
  setShowContent: (isShown: boolean) => void
}

export const CardActionBar = ({
  card,
  isOpen,
  setCardToSpeech,
  isCardPlaying,
  pagePosition,
  showContent,
  setShowContent,
}: Props) => {
  const { data: meData, isSuccess: isMeSuccess } = useMe()
  const { theme } = useTheme()
  const { pathname } = usePaths()
  const { isCardAlwaysExpanded } = cardsSettingsStore()
  const [showExtraData, setShowExtraData] = useState(isCardAlwaysExpanded)
  const [isUnauthorizedOpen, setIsUnauthorizedOpen] = useState(false)

  const {
    id,
    title,
    content,
    isDisliked,
    dislikes,
    favorites,
    isFavorite,
    isLiked,
    likes,
    authorId,
    ...restCard
  } = card

  const isCardAuthor = authorId === meData?.id

  const openUnauthorized = () => setIsUnauthorizedOpen(true)
  const closeUnauthorized = () => setIsUnauthorizedOpen(false)

  return (
    <>
      <Wrapper as='div' hasGaps className='justify-between'>
        <Wrapper hasGaps>
          <ExpandCard
            isExpanded={showExtraData}
            setIsExpanded={setShowExtraData}
          />
          <LikeCard
            userId={meData?.id}
            isUserLoggedIn={isMeSuccess}
            cardId={id}
            likes={likes}
            isLiked={isLiked}
            openUnauthorized={openUnauthorized}
            theme={theme}
          />
          <DislikeCard
            userId={meData?.id}
            isUserLoggedIn={isMeSuccess}
            openUnauthorized={openUnauthorized}
            cardId={id}
            dislikes={dislikes}
            isDisliked={isDisliked}
            theme={theme}
          />
          <FavorCard
            userId={meData?.id}
            isUserLoggedIn={isMeSuccess}
            openUnauthorized={openUnauthorized}
            cardId={id}
            favorites={favorites}
            isFavorite={isFavorite}
            theme={theme}
          />
          <CopyCard theme={theme} content={content} title={title} />
          <ShareCard cardId={id} theme={theme} />
          {setCardToSpeech && (
            <PlayCard
              isCardPlaying={isCardPlaying}
              card={card}
              setCardToSpeech={setCardToSpeech}
            />
          )}
          <ShowCard showContent={showContent} setShowContent={setShowContent} />
          {isMeSuccess && isCardAuthor && (
            <>
              <EditCard cardId={id} />
              <DeleteCard cardId={id} userId={meData?.id} theme={theme} />
            </>
          )}
        </Wrapper>
        <FocusCard cardId={id} isOpen={isOpen} />
      </Wrapper>
      {showExtraData && (
        <CardExtraData
          pagePosition={pagePosition}
          authorId={authorId}
          cardId={id}
          {...restCard}
        />
      )}
      <UnauthorizedDialog
        open={isUnauthorizedOpen}
        close={closeUnauthorized}
        returnPath={pathname}
      />
    </>
  )
}