import type { CardResponse } from '@/api/cards/cards.types'
import { Button } from '@/components/button'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { UnauthorizedDialog } from '@/components/dialogs/unauthorizedDialog'
import { FillIcon } from '@/components/fillIcon'
import { useMe } from '@/hooks/useAuth'
import { useDislikeCard, useFavoriteCard, useLikeCard } from '@/hooks/useCards'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { dateToLocale } from '@/utils/dateToLocale'
import { cn } from '@/utils/mergeClasses'
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Link as LinkIcon,
  Speech,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  User,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { MagicMotion } from 'react-magic-motion'
import { toast } from 'react-toastify'

type Props = {
  card: CardResponse
  isExpanded?: boolean
  isOpen?: boolean
  isCardToSpeech?: boolean
  setCardToSpeech?: (card: CardResponse) => void
  isCardPlaying?: boolean
  isStudyMode: boolean
} & ComponentPropsWithoutRef<'article'>

// ToDo: Uncategorized
export const Card = ({
  card,
  isOpen,
  isCardToSpeech,
  setCardToSpeech,
  isCardPlaying,
  isStudyMode,
  className,
  ...restProps
}: Props) => {
  const { data: meData, isSuccess: isMeSuccess } = useMe()

  const {
    mutate: like,
    data: likeData,
    isSuccess: isLikeSuccess,
    isError: isLikeError,
    error: likeError,
  } = useLikeCard(meData?.id)

  const {
    mutate: dislike,
    data: dislikeData,
    isSuccess: isDislikeSuccess,
    isError: isDislikeError,
    error: dislikeError,
  } = useDislikeCard(meData?.id)

  const {
    mutate: favorite,
    data: favoriteData,
    isSuccess: isFavoriteSuccess,
    isError: isFavoriteError,
    error: favoriteError,
  } = useFavoriteCard(meData?.id)

  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(restProps.isExpanded)
  const [isShown, setIsShown] = useState(isStudyMode)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const expandTitle = isExpanded ? 'Collapse' : 'Expand'
  const expandIcon = isExpanded ? <ChevronUp /> : <ChevronDown />
  const showTitle = isShown ? 'Hide content' : 'Show content'
  const showIcon = isShown ? <EyeOff /> : <Eye />

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

  const copyCardLink = () =>
    copyToClipboard(
      `${window.location.origin}/card/${id}`,
      'Card link copied to clipboard',
      theme,
    )

  const openDialog = () => setIsDialogOpen(true)
  const closeDialog = () => setIsDialogOpen(false)

  const onLike = () => (isMeSuccess ? like(id) : openDialog())
  const onDislike = () => (isMeSuccess ? dislike(id) : openDialog())
  const onFavorite = () => (isMeSuccess ? favorite(id) : openDialog())

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeError) {
      toast(likeError.message, { theme, type: 'error' })
    }
  }, [isLikeError, likeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeError) {
      toast(dislikeError.message, { theme, type: 'error' })
    }
  }, [isDislikeError, dislikeError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isFavoriteError) {
      toast(favoriteError.message, { theme, type: 'error' })
    }
  }, [isFavoriteError, favoriteError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isLikeSuccess) {
      toast(likeData.isLiked ? 'Card liked' : 'Like removed', {
        theme,
        type: 'success',
      })
    }
  }, [isLikeSuccess, likeData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeSuccess) {
      toast(dislikeData.isDisliked ? 'Card disliked' : 'Dislike removed', {
        theme,
        type: 'success',
      })
    }
  }, [isDislikeSuccess, dislikeData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isFavoriteSuccess) {
      toast(
        favoriteData.isFavorite
          ? 'Card added to favorites'
          : 'Card removed from favorites',
        { theme, type: 'success' },
      )
    }
  }, [isFavoriteSuccess, favoriteData])

  useEffect(() => setIsShown(isStudyMode), [isStudyMode])

  return (
    <MagicMotion>
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
            <p className='whitespace-pre-wrap break-words'>{content}</p>
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
                >
                  <FillIcon icon={ThumbsUp} isFilled={isLiked} />
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
                >
                  <FillIcon icon={ThumbsDown} isFilled={isDisliked} />
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
                >
                  <FillIcon icon={Star} isFilled={isFavorite} />
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
              <Button
                variant='text'
                onClick={copyCardLink}
                title='Copy card link to clipboard'
              >
                <LinkIcon />
              </Button>
              {setCardToSpeech && (
                <Button variant='text' onClick={onCardToSpeech}>
                  <Speech className={cn(isCardPlaying && 'animate-pulse')} />
                </Button>
              )}
              <Button variant='text' title={showTitle} onClick={toggleIsShown}>
                {showIcon}
              </Button>
              {isCardAuthor && (
                <Button variant='text' title='Delete card' isDanger>
                  <Trash2 />
                </Button>
              )}
            </Wrapper>
            {isOpen ? (
              <Link href={'/'}>Close</Link>
            ) : (
              <Link href={`/card/${id}`}>Open</Link>
            )}
          </Wrapper>
          {isExpanded && (
            <aside>
              <p>Categories: {categories.join(', ')}</p>
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
                  Created: <time>{dateToLocale(createdAt)}</time>
                </p>
                <p>
                  Updated: <time>{dateToLocale(updatedAt)}</time>
                </p>
              </Wrapper>
            </aside>
          )}
        </Block>
        <UnauthorizedDialog open={isDialogOpen} close={closeDialog} />
      </>
    </MagicMotion>
  )
}
