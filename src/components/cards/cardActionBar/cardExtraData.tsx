import { Wrapper } from '@/components/containers/wrapper'
import { getLocalDate } from '@/utils/getLocalDate'
import { User } from 'lucide-react'
import Link from 'next/link'

type Props = {
  showExtraData: boolean
  cardId: string
  categories: string[]
  authorId: string
  authorUsername: string
  createdAt: string
  updatedAt: string
  pagePosition?: number
}

export const CardExtraData = ({
  showExtraData,
  cardId,
  categories,
  createdAt,
  updatedAt,
  authorId,
  authorUsername,
  pagePosition,
}: Props) => {
  if (!showExtraData) {
    return null
  }

  return (
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
        <p>Card ID: {cardId}</p>
      </Wrapper>
      <Wrapper as='div' className='justify-between gap-x-4'>
        <p>
          Created: <time>{getLocalDate(createdAt)}</time>
        </p>
        <p>
          Updated: <time>{getLocalDate(updatedAt)}</time>
        </p>
      </Wrapper>
      {pagePosition && <p>Card position on current page: #{pagePosition}</p>}
    </aside>
  )
}