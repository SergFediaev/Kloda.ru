import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useDislikeCard } from '@/hooks/useCards'
import { ThumbsDown } from 'lucide-react'
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
  const { mutate: dislike, isPending: isDislikePending } =
    useDislikeCard(userId)

  const onDislike = () => {
    !isUserLoggedIn
      ? openUnauthorized()
      : dislike(cardId, {
          onSuccess: data => {
            toast(data.isDisliked ? 'Card disliked' : 'Dislike removed', {
              theme,
              type: 'success',
            })
          },
          onError: dislikeError => {
            toast(dislikeError.message, { theme, type: 'error' })
          },
        })
  }

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Dislike'
        onClick={onDislike}
        isBlocked={!isUserLoggedIn}
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