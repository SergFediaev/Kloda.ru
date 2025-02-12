import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useLikeCard } from '@/hooks/useCards'
import { ThumbsUp } from 'lucide-react'
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
  const { mutate: like, isPending: isLikePending } = useLikeCard(userId)

  const onLike = () => {
    return !isUserLoggedIn
      ? openUnauthorized()
      : like(cardId, {
          onSuccess: data => {
            toast(data.isLiked ? 'Card liked' : 'Like removed', {
              theme,
              type: 'success',
            })
          },
          onError: likeError => {
            toast(likeError.message, { theme, type: 'error' })
          },
        })
  }

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
          isFilled={isLiked}
          isDisabled={isLikePending}
        />
      </Button>
      &nbsp;
      {likes}
    </Wrapper>
  )
}
