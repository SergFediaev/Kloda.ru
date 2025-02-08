import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useFavoriteCard } from '@/hooks/useCards'
import { Star } from 'lucide-react'
import { useEffect } from 'react'
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
  const {
    mutate: favorite,
    isPending: isFavoritePending,
    isSuccess: isFavoriteSuccess,
    data: favoriteData,
    isError: isFavoriteError,
    error: favoriteError,
  } = useFavoriteCard(userId)

  const onFavorite = () =>
    isUserLoggedIn ? favorite(cardId) : openUnauthorized()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isFavoriteError) toast(favoriteError.message, { theme, type: 'error' })
  }, [isFavoriteError, favoriteError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isFavoriteSuccess)
      toast(
        favoriteData.isFavorite
          ? 'Card added to favorites'
          : 'Card removed from favorites',
        { theme, type: 'success' },
      )
  }, [isFavoriteSuccess, favoriteData])
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