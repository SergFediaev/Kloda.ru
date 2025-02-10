import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { FillIcon } from '@/components/fillIcon'
import { useFavoriteCard } from '@/hooks/useCards'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
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
  const [favoritesCount, setFavoritesCount] = useState(Number(favorites))
  const [isIconFilled, setIsIconFilled] = useState(isFavorite)

  const {
    mutate: favorite,
    isPending: isFavoritePending,
    isSuccess: isFavoriteSuccess,
    data: favoriteData,
    isError: isFavoriteError,
    error: favoriteError,
  } = useFavoriteCard(userId)

  const handleFavorite = () => {
    setIsIconFilled(prev => !prev)
    setFavoritesCount(prev => (isIconFilled ? prev - 1 : prev + 1))
    favorite(cardId)
  }

  const onFavorite = () =>
    isUserLoggedIn ? handleFavorite() : openUnauthorized()

  useEffect(() => {
    setIsIconFilled(isFavorite)
    setFavoritesCount(Number(favorites))
  }, [isFavorite, favorites])

  useEffect(() => {
    if (isFavoriteError) {
      setIsIconFilled(prev => !prev)
      setFavoritesCount(prev => (isIconFilled ? prev + 1 : prev - 1))
      toast(favoriteError.message, { theme, type: 'error' })
    }

    if (isFavoriteSuccess)
      toast(
        favoriteData.isFavorite
          ? 'Card added to favorites'
          : 'Card removed from favorites',
        { theme, type: 'success' },
      )
  }, [
    isFavoriteError,
    favoriteError,
    isFavoriteSuccess,
    favoriteData,
    isIconFilled,
    theme,
  ])

  return (
    <Wrapper>
      <Button
        variant='text'
        title='Favorite'
        onClick={onFavorite}
        isBlocked={!isUserLoggedIn}
        disabled={isFavoritePending}
        //isLoading={isFavoritePending}
      >
        <FillIcon
          icon={Star}
          isFilled={isIconFilled}
          isDisabled={isFavoritePending}
        />
      </Button>
      &nbsp;
      {favoritesCount}
    </Wrapper>
  )
}