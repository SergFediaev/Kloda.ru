import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useLikeCard } from '@/hooks/useCards'
import { ThumbsUp } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  isUserRegistered: boolean
  openUnauthorized: () => void
  cardId: string
  likes: string
  isLiked: boolean
  theme?: string
}

export const LikeCard = ({
  isUserRegistered,
  userId,
  cardId,
  likes,
  isLiked,
  openUnauthorized,
  theme,
}: Props) => {
  const {
    mutate: like,
    isPending: isLikePending,
    isSuccess: isLikeSuccess,
    data: likeData,
    isError: isLikeError,
    error: likeError,
  } = useLikeCard(userId)

  const onLike = () => (isUserRegistered ? like(cardId) : openUnauthorized())

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeError) toast(likeError.message, { theme, type: 'error' })
  }, [isLikeError, likeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeSuccess)
      toast(likeData.isLiked ? 'Card liked' : 'Like removed', {
        theme,
        type: 'success',
      })
  }, [isLikeSuccess, likeData])

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Like'
        onClick={onLike}
        isBlocked={!isUserRegistered}
        disabled={isLikePending}
        isLoading={isLikePending}
      >
        <FillIcon
          icon={ThumbsUp}
          isFilled={isLiked}
          isDisabled={isLikePending}
        />
      </Button>
      &nbsp;
      {likes}
    </Wrapper>
  )
}