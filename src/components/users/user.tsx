import type { UserResponse } from '@/api/users/users.types'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { dateToLocale } from '@/utils/dateToLocale'
import { Mail } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  user: UserResponse
  isOpen?: boolean
} & ComponentPropsWithoutRef<'article'>

// ToDo: TypeError: Cannot read properties of undefined (reading 'id')
export const User = ({
  user: {
    id,
    username,
    email,
    createdCards,
    favoriteCards,
    likedCards,
    dislikedCards,
    registeredAt,
  },
  isOpen,
  ...restProps
}: Props) => (
  <Block
    as='article'
    heading={username}
    isConstrained={isOpen}
    className='max-w-2xl'
    {...restProps}
  >
    <div>
      <p>User ID: {id}</p>
      <Wrapper>
        Email:&nbsp;<a href={`mailto:${email}`}>{email}</a>
        &nbsp;
        <Mail size={16} />
      </Wrapper>
      <p>
        Registered: <time>{dateToLocale(registeredAt)}</time>
      </p>
    </div>
    <div>
      <p>Created cards: {createdCards.join(', ')}</p>
      <p>Favorite cards: {favoriteCards.join(', ')}</p>
      <p>Liked cards: {likedCards.join(', ')}</p>
      <p>Disliked cards: {dislikedCards.join(', ')}</p>
    </div>
    {isOpen ? (
      <Link href={'/users'}>Close</Link>
    ) : (
      <Link href={`/user/${id}`}>Open</Link>
    )}
  </Block>
)
