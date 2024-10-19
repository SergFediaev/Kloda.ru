import type {
  CardArgs,
  CardResponse,
  CardsArgs,
  CardsResponse,
} from '@/api/cards/cards.types'
import ky from 'ky'
import queryString from 'query-string'

const cardsApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/cards`,
})

export const getCards = (searchParams: CardsArgs) =>
  cardsApi<CardsResponse>('', {
    searchParams: queryString.stringify(searchParams),
  }).json()

export const getCard = (id: string) => cardsApi<CardResponse>(id).json()

export const createCard = (json: CardArgs) =>
  cardsApi.post<CardResponse>('', { json }).json()

export const likeCard = (id: number) => cardsApi.patch(`${id}/like`).json()

export const dislikeCard = (id: number) =>
  cardsApi.patch(`${id}/dislike`).json()
