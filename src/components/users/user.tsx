import type { UserResponse } from '@/api/users/users.types'
import { Button } from '@/components/button'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { useLogout, useMe } from '@/hooks/useAuth'
import { dateToLocale } from '@/utils/dateToLocale'
import { Mail } from 'lucide-react'
import { Link } from 'next-view-transitions'
import type { ComponentPropsWithoutRef } from 'react'
import { MagicMotion } from 'react-magic-motion'

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
    createdCardsCount,
    favoriteCardsCount,
    likedCardsCount,
    dislikedCardsCount,
    registeredAt,
    lastLoginAt,
  },
  isOpen,
  ...restProps
}: Props) => {
  const { isSuccess, data } = useMe()
  const { mutate, isPending } = useLogout()

  const isCurrentUser = isSuccess && id === data.id
  const logoutText = isPending ? 'Logging out' : 'Logout'

  const onLogout = () => mutate()

  return (
    <MagicMotion>
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
          <p>
            Last login: <time>{dateToLocale(lastLoginAt)}</time>
          </p>
        </div>
        <div>
          <p>Created cards: {createdCardsCount}</p>
          <p>Favorite cards: {favoriteCardsCount}</p>
          <p>Liked cards: {likedCardsCount}</p>
          <p>Disliked cards: {dislikedCardsCount}</p>
        </div>
        {isOpen ? (
          <Link href={'/users'}>Close</Link>
        ) : (
          <Link href={`/user/${id}`}>Open</Link>
        )}
        {isCurrentUser && (
          <Button onClick={onLogout} className='self-end'>
            {logoutText}
          </Button>
        )}
      </Block>
    </MagicMotion>
  )
}
