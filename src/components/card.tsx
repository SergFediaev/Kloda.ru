import { Button } from '@/components/button'
import { Wrapper } from '@/components/wrapper'
import type { CardResponse } from '@/services/cards/cards.types'
import { dateToLocale } from '@/utils/dateToLocale'
import Link from 'next/link'
import { type ComponentPropsWithoutRef, useState } from 'react'

type CardProps = {
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
}: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(restProps.isExpanded)
  const isExpandedText = isExpanded ? 'Collapse ▲' : 'Expand ▼'
  const toggleIsExpanded = () => setIsExpanded(!isExpanded)

  return (
    <article className='bg-neutral-200 dark:bg-neutral-800 rounded-3xl p-8 flex flex-col gap-8 break-inside-avoid shadow-lg'>
      <h2 className='text-2xl'>{title}</h2>
      <p className='whitespace-break-spaces'>{content}</p>
      <Wrapper className='justify-between items-center gap-y-4'>
        <Wrapper className='gap-y-4'>
          <Button onClick={toggleIsExpanded}>{isExpandedText}</Button>
          <Button disabled>Like</Button>
          <Button disabled>Dislike</Button>
        </Wrapper>
        {!isOpen && <Link href={`/card/${id}`}>Open</Link>}
      </Wrapper>
      {isExpanded && (
        <aside>
          <p>Categories: {categories.join(', ')}</p>
          <Wrapper className='justify-between'>
            <span>Likes: {likes}</span>
            <span>Dislikes: {dislikes}</span>
          </Wrapper>
          <Wrapper className='justify-between'>
            <span>
              Author: <a href={`mailto:${authorId}`}>{authorId}</a> ✉
            </span>
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
