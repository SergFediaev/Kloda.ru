import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useDislikeCard } from '@/hooks/useCards'
import { ThumbsDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  isUserLoggedIn: boolean
  openUnauthorized: () => void
  cardId: string
  dislikes: string
  isDisliked: boolean
  theme?: string
}

export const DislikeCard = ({
  userId,
  isUserLoggedIn,
  openUnauthorized,
  cardId,
  dislikes,
  isDisliked,
  theme,
}: Props) => {
  const [dislikesCount, setDislikesCount] = useState(Number(dislikes))
  const [isIconFilled, setIsIconFilled] = useState(isDisliked)

  const {
    mutate: dislike,
    isPending: isDislikePending,
    isSuccess: isDislikeSuccess,
    data: dislikeData,
    isError: isDislikeError,
    error: dislikeError,
  } = useDislikeCard(userId)

  const handleDisLike = () => {
    setIsIconFilled(prev => !prev)
    setDislikesCount(prev => (isIconFilled ? prev - 1 : prev + 1))
    dislike(cardId)
  }

  const onDislike = () =>
    isUserLoggedIn ? handleDisLike() : openUnauthorized()

  useEffect(() => {
    setIsIconFilled(isDisliked)
    setDislikesCount(Number(dislikes))
  }, [isDisliked, dislikes])

  useEffect(() => {
    if (isDislikeError) {
      setIsIconFilled(prev => !prev)
      setDislikesCount(prev => (isIconFilled ? prev + 1 : prev - 1))
      toast(dislikeError?.message, { theme, type: 'error' })
    }

    if (isDislikeSuccess)
      toast(dislikeData.isDisliked ? 'Card disliked' : 'Dislike removed', {
        theme,
        type: 'success',
      })
  }, [
    isDislikeSuccess,
    dislikeData,
    isDislikeError,
    dislikeError,
    isIconFilled,
    theme,
  ])

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Dislike'
        onClick={onDislike}
        isBlocked={!isUserLoggedIn}
        disabled={isDislikePending}
        // isLoading={isDislikePending}
      >
        <FillIcon
          icon={ThumbsDown}
          isFilled={isIconFilled}
          isDisabled={isDislikePending}
        />
      </Button>
      &nbsp;
      {dislikesCount}
    </Wrapper>
  )
}