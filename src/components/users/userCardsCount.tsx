import { Wrapper } from '@/components/containers/wrapper'
import { Search } from 'lucide-react'
import Link from 'next/link'

type Props = {
  cardsType: string
  cardsCount: number
  userId: number
  action: 'created' | 'favorite' | 'liked' | 'disliked'
}

export const UserCardsCount = ({
  cardsType,
  cardsCount,
  userId,
  action,
}: Props) => {
  const element =
    cardsCount === 0 ? (
      cardsCount
    ) : (
      <Wrapper
        as={Link}
        href={{ pathname: '/', query: { userId, action } }}
        title={`Search ${cardsType.toLowerCase()} cards`}
        className='border-accent border-b no-underline hover:border-accent-variant dark:border-accent-dark dark:hover:border-accent-dark-variant'
      >
        {cardsCount}
        &nbsp;
        <Search size={16} />
      </Wrapper>
    )

  return (
    <Wrapper as='p' className='items-baseline'>
      {cardsType} cards:&nbsp;{element}
    </Wrapper>
  )
}
