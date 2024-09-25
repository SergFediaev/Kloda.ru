import type { CardArgs, CardResponse } from '@/api/cards/cards.types'
import ky from 'ky'

const cardsApi = ky.create({
  prefixUrl: 'https://api.kloda.fediaev.ru/v1/cards',
})

export const getCards = () => cardsApi('').json<CardResponse[]>()

export const getCard = (id: string) => cardsApi(id).json<CardResponse[]>()

export const createCard = (json: CardArgs) =>
  cardsApi.post('', { json }).json<CardResponse[]>()
