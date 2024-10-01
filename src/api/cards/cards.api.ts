import type {
  CardArgs,
  CardResponse,
  CardsArgs,
  CardsResponse,
} from '@/api/cards/cards.types'
import ky from 'ky'

const cardsApi = ky.create({
  prefixUrl: 'https://api.kloda.fediaev.ru/v1/cards',
})

export const getCards = (searchParams: CardsArgs) =>
  cardsApi<CardsResponse>('', { searchParams }).json()

export const getCard = (id: string) => cardsApi<CardResponse[]>(id).json()

export const createCard = (json: CardArgs) =>
  cardsApi.post<CardResponse[]>('', { json }).json()

export const likeCard = (id: number) => cardsApi.patch(`${id}/like`).json()

export const dislikeCard = (id: number) =>
  cardsApi.patch(`${id}/dislike`).json()
