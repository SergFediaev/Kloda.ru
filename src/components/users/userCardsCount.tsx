import { Wrapper } from '@/components/containers/wrapper'
import { usePaths } from '@/hooks/usePaths'
import { Search } from 'lucide-react'
import Link from 'next/link'

type Props = {
  cardsType: string
  cardsCount: string
  userId: string
  action: 'created' | 'favorite' | 'liked' | 'disliked'
}

export const UserCardsCount = ({
  cardsType,
  cardsCount,
  userId,
  action,
}: Props) => {
  const pathname = usePaths().cardsPath

  const element =
    cardsCount === '0' ? (
      cardsCount
    ) : (
      <Wrapper
        as={Link}
        href={{ pathname, query: { userId, action } }}
        title={`Search ${cardsType.toLowerCase()} cards`}
        className='border-accent border-b no-underline hover:border-accent-dark dark:border-accent-dark dark:hover:border-accent'
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
