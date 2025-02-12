import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useFavoriteCard } from '@/hooks/useCards'
import { Star } from 'lucide-react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  isUserLoggedIn: boolean
  openUnauthorized: () => void
  cardId: string
  favorites: string
  isFavorite: boolean
  theme?: string
}

export const FavorCard = ({
  userId,
  isUserLoggedIn,
  openUnauthorized,
  cardId,
  favorites,
  isFavorite,
  theme,
}: Props) => {
  const { mutate: favorite, isPending: isFavoritePending } =
    useFavoriteCard(userId)

  const onFavorite = () => {
    !isUserLoggedIn
      ? openUnauthorized()
      : favorite(cardId, {
          onSuccess: data => {
            toast(
              data.isFavorite
                ? 'Card added to favorites'
                : 'Card removed from favorites',
              { theme, type: 'success' },
            )
          },
          onError: favoriteError => {
            toast(favoriteError.message, { theme, type: 'error' })
          },
        })
  }

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Favorite'
        onClick={onFavorite}
        isBlocked={!isUserLoggedIn}
        disabled={isFavoritePending}
        isLoading={isFavoritePending}
      >
        <FillIcon
          icon={Star}
          isFilled={isFavorite}
          isDisabled={isFavoritePending}
        />
      </Button>
      &nbsp;
      {favorites}
    </Wrapper>
  )
}
