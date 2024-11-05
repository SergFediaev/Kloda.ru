import { refresh } from '@/api/auth/auth.api'
import type {
  CardArgs,
  CardResponse,
  CardsArgs,
  CardsResponse,
  DislikeResponse,
  FavoriteResponse,
  LikeResponse,
} from '@/api/cards/cards.types'
import { setHeadersAuth } from '@/utils/setHeadersAuth'
import ky from 'ky'
import queryString from 'query-string'

const cardsApi = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}v1/cards`,
  hooks: {
    beforeRequest: [({ headers }) => setHeadersAuth(headers)],
    beforeRetry: [() => refresh()],
  },
  retry: {
    statusCodes: [401, 403],
  },
})

export const getCards = (searchParams: CardsArgs) =>
  cardsApi<CardsResponse>('', {
    searchParams: queryString.stringify(searchParams),
  }).json()

export const getCard = (id: string) => cardsApi<CardResponse>(id).json()

export const createCard = (json: CardArgs) =>
  cardsApi.post<CardResponse>('', { json }).json()

export const likeCard = (id: number) =>
  cardsApi.patch<LikeResponse>(`${id}/like`).json()

export const dislikeCard = (id: number) =>
  cardsApi.patch<DislikeResponse>(`${id}/dislike`).json()

export const favoriteCard = (id: number) =>
  cardsApi.patch<FavoriteResponse>(`${id}/favorite`).json()
