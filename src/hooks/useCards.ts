import {
  createCard,
  dislikeCard,
  favoriteCard,
  getCard,
  getCards,
  getRandomCard,
  likeCard,
} from '@/api/cards/cards.api'
import type {
  CardArgs,
  CardsArgs,
  RandomCardArgs,
} from '@/api/cards/cards.types'
import { getQueryClient } from '@/app/getQueryClient'
import { type QueryClient, useMutation, useQuery } from '@tanstack/react-query'

export const useGetCards = (args: CardsArgs) =>
  useQuery({
    queryKey: ['cards', ...Object.values(args)],
    queryFn: () => getCards(args),
  })

export const useGetCard = (args: CardArgs) =>
  useQuery({
    queryKey: ['card', ...Object.values(args)],
    queryFn: () => getCard(args),
  })

export const useGetRandomCard = (args: RandomCardArgs) =>
  useQuery({
    queryKey: ['randomCard', ...Object.values(args)],
    queryFn: () => getRandomCard(args),
    enabled: false,
  })

export const useCreateCard = (authorId: number) =>
  useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
      invalidateUsers(queryClient, authorId)
    },
  })

export const useLikeCard = (userId?: number) =>
  useMutation({
    mutationFn: likeCard,
    onSuccess: (_, variables) => invalidateCardsAndUsers(variables, userId),
  })

export const useDislikeCard = (userId?: number) =>
  useMutation({
    mutationFn: dislikeCard,
    onSuccess: (_, variables) => invalidateCardsAndUsers(variables, userId),
  })

export const useFavoriteCard = (userId?: number) =>
  useMutation({
    mutationFn: favoriteCard,
    onSuccess: (_, variables) => invalidateCardsAndUsers(variables, userId),
  })

const invalidateCards = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['cards'] })

const invalidateUsers = (queryClient: QueryClient, userId: number) => {
  void queryClient.invalidateQueries({ queryKey: ['users'] })
  void queryClient.invalidateQueries({ queryKey: ['user', String(userId)] })
}

const invalidateCardsAndUsers = (cardId: number, userId?: number) => {
  const queryClient = getQueryClient()
  void invalidateCards(queryClient)
  void queryClient.invalidateQueries({ queryKey: ['card', String(cardId)] })

  if (userId) invalidateUsers(queryClient, userId)
}
