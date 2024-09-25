import type { CardResponse } from '@/api/cards/cards.types'
import { Button } from '@/components/button'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { useDislikeCard, useLikeCard } from '@/hooks/useCards'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { dateToLocale } from '@/utils/dateToLocale'
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Link as LinkIcon,
  Mail,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  card: CardResponse
  isExpanded?: boolean
  isOpen?: boolean
} & ComponentPropsWithoutRef<'article'>

// ToDo: Uncategorized, author email, TypeError: Cannot read properties of undefined (reading 'id')
export const Card = ({
  card: {
    id,
    title,
    content,
    categories,
    likes,
    dislikes,
    authorId,
    createdAt,
    updatedAt,
  },
  isOpen,
  ...restProps
}: Props) => {
  const {
    mutate: like,
    isSuccess: isLikeSuccess,
    isError: isLikeError,
    error: likeError,
  } = useLikeCard()

  const {
    mutate: dislike,
    isSuccess: isDislikeSuccess,
    isError: isDislikeError,
    error: dislikeError,
  } = useDislikeCard()

  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(restProps.isExpanded)
  const expandTitle = isExpanded ? 'Collapse' : 'Expand'
  const expandIcon = isExpanded ? (
    <ChevronUp size={16} />
  ) : (
    <ChevronDown size={16} />
  )
  const toggleIsExpanded = () => setIsExpanded(!isExpanded)

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

  const onLike = () => like(id)

  const onDislike = () => dislike(id)

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
    if (isLikeSuccess) {
      toast('Card liked', { theme, type: 'success' })
    }
  }, [isLikeSuccess])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDislikeSuccess) {
      toast('Card disliked', { theme, type: 'success' })
    }
  }, [isDislikeSuccess])

  return (
    <Block
      as='article'
      heading={title}
      isConstrained={isOpen}
      className='max-w-2xl'
      {...restProps}
    >
      <p className='whitespace-pre-wrap break-words'>{content}</p>
      <Wrapper as='div' hasGaps className='justify-between'>
        <Wrapper hasGaps>
          <Button variant='text' onClick={toggleIsExpanded} title={expandTitle}>
            {expandIcon}
          </Button>
          <Wrapper>
            <Button variant='text' title='Like' onClick={onLike}>
              <ThumbsUp size={16} />
            </Button>
            &nbsp;
            {likes}
          </Wrapper>
          <Wrapper>
            <Button variant='text' title='Dislike' onClick={onDislike}>
              <ThumbsDown size={16} />
            </Button>
            &nbsp;
            {dislikes}
          </Wrapper>
          <Button
            variant='text'
            onClick={copyCardContent}
            title='Copy card content to clipboard'
          >
            <Copy size={16} />
          </Button>
          <Button
            variant='text'
            onClick={copyCardLink}
            title='Copy card link to clipboard'
          >
            <LinkIcon size={16} />
          </Button>
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
          <Wrapper className='justify-between gap-x-4'>
            <Wrapper>
              Author:&nbsp;<a href={`mailto:${authorId}`}>{authorId}</a>
              &nbsp;
              <Mail size={16} />
            </Wrapper>
            <span>Card ID: {id}</span>
          </Wrapper>
          <Wrapper className='justify-between gap-x-4'>
            <span>
              Created: <time>{dateToLocale(createdAt)}</time>
            </span>
            <span>
              Updated: <time>{dateToLocale(updatedAt)}</time>
            </span>
          </Wrapper>
        </aside>
      )}
    </Block>
  )
}
