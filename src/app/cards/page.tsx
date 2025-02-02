import { Cards } from '@/components/cards/cards'
import { Container } from '@/components/containers/container'
import {
  CARDS_DEFAULT_PARAMS,
  type CardsSearchParams,
} from '@/components/displayOptions/pageControls'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards',
}

type Props = {
  searchParams?: CardsSearchParams
}

export default function CardsPage({ searchParams }: Props) {
  return (
    <Container>
      <Cards {...CARDS_DEFAULT_PARAMS} {...searchParams} />
    </Container>
  )
}