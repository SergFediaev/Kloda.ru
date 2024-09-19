import { Wrapper } from '@/components/wrapper'
import type { CardResponse } from '@/services/cards/cards.types'
import { dateToLocale } from '@/utils/dateToLocale'
import type { ComponentPropsWithoutRef } from 'react'

type CardProps = {
  card: CardResponse
} & ComponentPropsWithoutRef<'article'>

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
}: CardProps) => (
  <article className='bg-neutral-200 dark:bg-neutral-800 rounded-3xl p-8 flex flex-col gap-8 break-inside-avoid shadow-lg'>
    <h2 className='text-2xl'>{title}</h2>
    <p className='whitespace-break-spaces'>{content}</p>
    <aside>
      <p>Categories: {categories.join(', ')}</p>
      <Wrapper>
        <span>Likes: {likes}</span>
        <span>Dislikes: {dislikes}</span>
      </Wrapper>
      <Wrapper>
        <span>
          Author: <a href={`mailto:${authorId}`}>{authorId}</a> ✉
        </span>
        <span>Card ID: {id}</span>
      </Wrapper>
      <Wrapper>
        <span>
          Created: <time>{dateToLocale(createdAt)}</time>
        </span>
        <span>
          Updated: <time>{dateToLocale(updatedAt)}</time>
        </span>
      </Wrapper>
    </aside>
  </article>
)
