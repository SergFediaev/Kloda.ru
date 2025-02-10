import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useLikeCard } from '@/hooks/useCards'
import { ThumbsUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  isUserLoggedIn: boolean
  openUnauthorized: () => void
  cardId: string
  likes: string
  isLiked: boolean
  theme?: string
}

export const LikeCard = ({
  isUserLoggedIn,
  userId,
  cardId,
  likes,
  isLiked,
  openUnauthorized,
  theme,
}: Props) => {
  const [likesCount, setLikesCount] = useState(Number(likes))
  const [isIconFilled, setIsIconFilled] = useState(isLiked)

  const {
    mutate: like,
    isPending: isLikePending,
    isSuccess: isLikeSuccess,
    data: likeData,
    isError: isLikeError,
    error: likeError,
  } = useLikeCard(userId)

  const handleLike = () => {
    setIsIconFilled(prev => !prev)
    setLikesCount(prev => (isIconFilled ? prev - 1 : prev + 1))
    like(cardId)
  }

  const onLike = () => (isUserLoggedIn ? handleLike() : openUnauthorized())

  useEffect(() => {
    setIsIconFilled(isLiked)
    setLikesCount(Number(likes))
  }, [isLiked, likes])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeError) {
      setIsIconFilled(prev => !prev)
      setLikesCount(prev => (isIconFilled ? prev + 1 : prev - 1))
      toast(likeError.message, { theme, type: 'error' })
    }
  }, [isLikeError, likeError, isIconFilled])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeSuccess)
      toast(likeData.isLiked ? 'Card liked' : 'Like removed', {
        theme,
        type: 'success',
      })
  }, [isLikeSuccess, likeData, isIconFilled])

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Like'
        onClick={onLike}
        isBlocked={!isUserLoggedIn}
        disabled={isLikePending}
        isLoading={isLikePending}
      >
        <FillIcon
          icon={ThumbsUp}
          isFilled={isIconFilled}
          isDisabled={isLikePending}
        />
      </Button>
      &nbsp;
      {likesCount}
    </Wrapper>
  )
}