import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useDislikeCard } from '@/hooks/useCards'
import { ThumbsDown } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  isUserRegistered: boolean
  openUnauthorized: () => void
  cardId: string
  dislikes: string
  isDisliked: boolean
  theme?: string
}

export const DislikeCard = ({
  userId,
  isUserRegistered,
  openUnauthorized,
  cardId,
  dislikes,
  isDisliked,
  theme,
}: Props) => {
  const {
    mutate: dislike,
    isPending: isDislikePending,
    isSuccess: isDislikeSuccess,
    data: dislikeData,
    isError: isDislikeError,
    error: dislikeError,
  } = useDislikeCard(userId)

  const onDislike = () =>
    isUserRegistered ? dislike(cardId) : openUnauthorized()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeError) toast(dislikeError.message, { theme, type: 'error' })
  }, [isDislikeError, dislikeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeSuccess)
      toast(dislikeData.isDisliked ? 'Card disliked' : 'Dislike removed', {
        theme,
        type: 'success',
      })
  }, [isDislikeSuccess, dislikeData])

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Dislike'
        onClick={onDislike}
        isBlocked={!isUserRegistered}
        disabled={isDislikePending}
        isLoading={isDislikePending}
      >
        <FillIcon
          icon={ThumbsDown}
          isFilled={isDisliked}
          isDisabled={isDislikePending}
        />
      </Button>
      &nbsp;
      {dislikes}
    </Wrapper>
  )
}