import type { CardModel } from '@/api/cards/cards.types'
import { Button } from '@/components/buttons/button'
import { ShareButton } from '@/components/buttons/shareButton'
import { CardContent } from '@/components/cards/cardContent'
import { Block, type BlockProps } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { ConfirmationDialog } from '@/components/dialogs/confirmationDialog'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import { FillIcon } from '@/components/fillIcon'
import { useMe } from '@/hooks/useAuth'
import {
  useDeleteCard,
  useDislikeCard,
  useFavoriteCard,
  useLikeCard,
} from '@/hooks/useCards'
import { usePaths } from '@/hooks/usePaths'
import { cardsModeStore } from '@/stores/cardsModeStore'
import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { getLocalDate } from '@/utils/getLocalDate'
import { cn } from '@/utils/mergeClasses'
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Speech,
  SquarePen,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  card: CardModel
  isOpen?: boolean
  cardToSpeechId?: string
  setCardToSpeech?: (card: CardModel) => void
  isCardPlaying?: boolean
  pagePosition?: number
} & ComponentPropsWithoutRef<'article'> &
  Pick<BlockProps, 'inColumns'>

// ToDo: Uncategorized
export const Card = ({
  card,
  isOpen,
  cardToSpeechId,
  setCardToSpeech,
  isCardPlaying,
  pagePosition,
  className,
  ...restProps
}: Props) => {
  const { data: meData, isSuccess: isMeSuccess } = useMe()
  const { isCardAlwaysExpanded, isMediaAlwaysShown } = cardsSettingsStore()
  const { isStudyMode } = cardsModeStore()
  const isCardToSpeech = card.id === cardToSpeechId

  const {
    mutate: deleteCard,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteCard(meData?.id)

  const {
    mutate: like,
    isPending: isLikePending,
    isSuccess: isLikeSuccess,
    data: likeData,
    isError: isLikeError,
    error: likeError,
  } = useLikeCard(meData?.id)

  const {
    mutate: dislike,
    isPending: isDislikePending,
    isSuccess: isDislikeSuccess,
    data: dislikeData,
    isError: isDislikeError,
    error: dislikeError,
  } = useDislikeCard(meData?.id)

  const {
    mutate: favorite,
    isPending: isFavoritePending,
    isSuccess: isFavoriteSuccess,
    data: favoriteData,
    isError: isFavoriteError,
    error: favoriteError,
  } = useFavoriteCard(meData?.id)

  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(
    isCardAlwaysExpanded ? isCardAlwaysExpanded : false,
  )
  const [isShown, setIsShown] = useState(isStudyMode)
  const [isUnauthorizedOpen, setIsUnauthorizedOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { cardsPath } = usePaths()

  const expandTitle = isExpanded ? 'Collapse' : 'Expand'
  const expandIcon = isExpanded ? <ChevronUp /> : <ChevronDown />
  const showTitle = isShown ? 'Hide content' : 'Show content'
  const showIcon = isShown ? <EyeOff /> : <Eye />
  const isPending =
    isDeletePending || isLikePending || isDislikePending || isFavoritePending

  const {
    id,
    title,
    content,
    categories,
    favorites,
    likes,
    dislikes,
    authorId,
    authorUsername,
    createdAt,
    updatedAt,
    isFavorite,
    isLiked,
    isDisliked,
  } = card

  const cardDetailsLink = isOpen ? cardsPath : `/card/${id}`
  const cardDetailsText = isOpen ? 'Close card details' : 'Open card details'
  const isCardAuthor = authorId === meData?.id

  const toggleIsExpanded = () => setIsExpanded(!isExpanded)

  const toggleIsShown = () => setIsShown(!isShown)

  const onCardToSpeech = () => setCardToSpeech?.(card)

  const copyCardContent = () =>
    copyToClipboard(
      `${title}\n\n${content}`,
      'Card content copied to clipboard',
      theme,
    )

  const openUnauthorized = () => setIsUnauthorizedOpen(true)
  const closeUnauthorized = () => setIsUnauthorizedOpen(false)

  const openConfirmation = () => setIsConfirmationOpen(true)
  const closeConfirmation = () => setIsConfirmationOpen(false)

  const onLike = () => (isMeSuccess ? like(id) : openUnauthorized())
  const onDislike = () => (isMeSuccess ? dislike(id) : openUnauthorized())
  const onFavorite = () => (isMeSuccess ? favorite(id) : openUnauthorized())

  const onDelete = () => {
    closeConfirmation()
    deleteCard(id)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDeleteError) toast(deleteError.message, { theme, type: 'error' })
  }, [isDeleteError, deleteError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeError) toast(likeError.message, { theme, type: 'error' })
  }, [isLikeError, likeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeError) toast(dislikeError.message, { theme, type: 'error' })
  }, [isDislikeError, dislikeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isFavoriteError) toast(favoriteError.message, { theme, type: 'error' })
  }, [isFavoriteError, favoriteError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDeleteSuccess)
      toast('Card deleted', {
        theme,
        type: 'success',
      })
  }, [isDeleteSuccess])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeSuccess)
      toast(likeData.isLiked ? 'Card liked' : 'Like removed', {
        theme,
        type: 'success',
      })
  }, [isLikeSuccess, likeData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeSuccess)
      toast(dislikeData.isDisliked ? 'Card disliked' : 'Dislike removed', {
        theme,
        type: 'success',
      })
  }, [isDislikeSuccess, dislikeData])

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

  useEffect(() => setIsShown(isStudyMode), [isStudyMode])

  return (
    <>
      <Block
        as='article'
        heading={title}
        isConstrained={isOpen}
        className={cn(
          isCardToSpeech &&
            'shadow-inner outline outline-2 outline-accent dark:outline-accent-dark',
          className,
        )}
        {...restProps}
      >
        {isShown && (
          <CardContent
            content={content}
            isMediaShown={isMediaAlwaysShown ? isMediaAlwaysShown : true}
          />
        )}
        <Wrapper as='div' hasGaps className='justify-between'>
          <Wrapper hasGaps>
            <Button
              variant='text'
              onClick={toggleIsExpanded}
              title={expandTitle}
            >
              {expandIcon}
            </Button>
            <Wrapper>
              <Button
                variant='text'
                title='Like'
                onClick={onLike}
                isBlocked={!isMeSuccess}
                disabled={isPending}
                isLoading={isLikePending}
              >
                <FillIcon
                  icon={ThumbsUp}
                  isFilled={isLiked}
                  isDisabled={isPending}
                />
              </Button>
              &nbsp;
              {likes}
            </Wrapper>
            <Wrapper>
              <Button
                variant='text'
                title='Dislike'
                onClick={onDislike}
                isBlocked={!isMeSuccess}
                disabled={isPending}
                isLoading={isDislikePending}
              >
                <FillIcon
                  icon={ThumbsDown}
                  isFilled={isDisliked}
                  isDisabled={isPending}
                />
              </Button>
              &nbsp;
              {dislikes}
            </Wrapper>
            <Wrapper>
              <Button
                variant='text'
                title='Favorite'
                onClick={onFavorite}
                isBlocked={!isMeSuccess}
                disabled={isPending}
                isLoading={isFavoritePending}
              >
                <FillIcon
                  icon={Star}
                  isFilled={isFavorite}
                  isDisabled={isPending}
                />
              </Button>
              &nbsp;
              {favorites}
            </Wrapper>
            <Button
              variant='text'
              onClick={copyCardContent}
              title='Copy card content to clipboard'
            >
              <Copy />
            </Button>
            <ShareButton
              url={`${window.location.origin}/card/${id}`}
              shareTitle='Share card link'
              copyTitle='Copy card link to clipboard'
              notification='Card link copied to clipboard'
              theme={theme}
            />
            {setCardToSpeech && (
              <Button variant='text' onClick={onCardToSpeech}>
                <Speech className={cn(isCardPlaying && 'animate-pulse')} />
              </Button>
            )}
            <Button variant='text' title={showTitle} onClick={toggleIsShown}>
              {showIcon}
            </Button>
            {isCardAuthor && (
              <>
                <Link href={`/edit-card/${id}`} title='Edit card'>
                  <SquarePen />
                </Link>
                <Button
                  variant='text'
                  title='Delete card'
                  onClick={openConfirmation}
                  isDanger
                  disabled={isPending}
                  isLoading={isDeletePending}
                >
                  <Trash2 />
                </Button>
              </>
            )}
          </Wrapper>
          <Button
            as={Link}
            href={cardDetailsLink}
            className='bg-accent hover:bg-accent-dark hover:text-primary-dark dark:bg-accent-dark dark:hover:bg-accent'
          >
            {cardDetailsText}
          </Button>
        </Wrapper>
        {isExpanded && (
          <aside>
            <p>
              Categories:&nbsp;
              {categories.length ? categories.join(', ') : 'Uncategorized'}
            </p>
            <Wrapper as='div' className='justify-between gap-x-4'>
              <Wrapper as='p'>
                Author:&nbsp;
                <Link href={`/user/${authorId}`} title='Open author profile'>
                  {authorUsername}
                </Link>
                &nbsp;
                <User size={16} />
              </Wrapper>
              <p>Card ID: {id}</p>
            </Wrapper>
            <Wrapper as='div' className='justify-between gap-x-4'>
              <p>
                Created: <time>{getLocalDate(createdAt)}</time>
              </p>
              <p>
                Updated: <time>{getLocalDate(updatedAt)}</time>
              </p>
            </Wrapper>
            {pagePosition && (
              <p>Card position on current page: #{pagePosition}</p>
            )}
          </aside>
        )}
      </Block>
      <UnauthorizedDialog open={isUnauthorizedOpen} close={closeUnauthorized} />
      <ConfirmationDialog
        open={isConfirmationOpen}
        close={closeConfirmation}
        confirmationText={
          <>
            <p>Are you sure you want to permanently delete card #{id}?</p>
            <p>You will not be able to restore card #{id} once deleted!</p>
          </>
        }
        confirmationButton={
          <Button onClick={onDelete} isStretched isDanger>
            Delete
          </Button>
        }
      />
    </>
  )
}