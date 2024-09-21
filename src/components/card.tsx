import { Button } from '@/components/button'
import { Wrapper } from '@/components/wrapper'
import type { CardResponse } from '@/services/cards/cards.types'
import { dateToLocale } from '@/utils/dateToLocale'
import {
  ChevronDown,
  ChevronUp,
  Mail,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react'
import Link from 'next/link'
import { type ComponentPropsWithoutRef, useState } from 'react'

type Props = {
  card: CardResponse
  isExpanded?: boolean
  isOpen?: boolean
} & ComponentPropsWithoutRef<'article'>

// ToDo: Uncategorized
// ToDo: Author email
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
  const [isExpanded, setIsExpanded] = useState(restProps.isExpanded)
  const expandTitle = isExpanded ? 'Collapse' : 'Expand'
  const expandIcon = isExpanded ? (
    <ChevronUp size={16} />
  ) : (
    <ChevronDown size={16} />
  )
  const toggleIsExpanded = () => setIsExpanded(!isExpanded)

  return (
    <article className='flex break-inside-avoid flex-col gap-8 rounded-3xl bg-surface p-6 shadow-lg dark:bg-surface-dark'>
      <h2 className='text-2xl'>{title}</h2>
      <p className='whitespace-pre-wrap break-words'>{content}</p>
      <Wrapper as='div' hasGaps className='justify-between'>
        <Wrapper hasGaps>
          <Button variant='text' onClick={toggleIsExpanded} title={expandTitle}>
            {expandIcon}
          </Button>
          <Wrapper>
            <Button variant='text' title='Like'>
              <ThumbsUp size={16} />
            </Button>
            &nbsp;
            {likes}
          </Wrapper>
          <Wrapper>
            <Button variant='text' title='Dislike'>
              <ThumbsDown size={16} />
            </Button>
            &nbsp;
            {dislikes}
          </Wrapper>
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
          <Wrapper className='justify-between'>
            <Wrapper>
              Author:&nbsp;<a href={`mailto:${authorId}`}>{authorId}</a>
              &nbsp;
              <Mail size={16} />
            </Wrapper>
            <span>Card ID: {id}</span>
          </Wrapper>
          <Wrapper className='justify-between'>
            <span>
              Created: <time>{dateToLocale(createdAt)}</time>
            </span>
            <span>
              Updated: <time>{dateToLocale(updatedAt)}</time>
            </span>
          </Wrapper>
        </aside>
      )}
    </article>
  )
}
