import {
  createCard,
  deleteCard,
  deleteCards,
  dislikeCard,
  editCard,
  exportCards,
  favoriteCard,
  getCard,
  getCards,
  getRandomCard,
  importCards,
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
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient, authorId)
    },
  })

export const useEditCard = () =>
  useMutation({
    mutationFn: editCard,
    onSuccess: ({ id }) => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCard(queryClient, id)
      void invalidateCategories(queryClient)
    },
  })

export const useDeleteCards = (userId: number) =>
  useMutation({
    mutationFn: deleteCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient, userId)
    },
  })

export const useDeleteCard = (userId?: number) =>
  useMutation({
    mutationFn: deleteCard,
    onSuccess: (_, variables) =>
      invalidateCardsAndUsers(variables, userId, true),
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

// ToDo: Refactor invalidating, duplicated with create card, also invalidate only one user
export const useImportCards = (userId: number) =>
  useMutation({
    mutationFn: importCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient, userId)
    },
  })

export const useExportCards = () =>
  useQuery({
    queryKey: ['exportCards'],
    queryFn: exportCards,
    enabled: false,
  })

// noinspection Annotator
export const invalidateCards = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['cards'] })

// noinspection Annotator
const invalidateCard = (queryClient: QueryClient, cardId: number) =>
  queryClient.invalidateQueries({ queryKey: ['card', String(cardId)] })

// noinspection Annotator
const invalidateCategories = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['categories'] })

const invalidateUsers = (queryClient: QueryClient, userId: number) => {
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['users'] })
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['user', String(userId)] })
}

const invalidateCardsAndUsers = (
  cardId: number,
  userId?: number,
  shouldInvalidateCategories?: boolean,
) => {
  const queryClient = getQueryClient()
  void invalidateCards(queryClient)
  void invalidateCard(queryClient, cardId)

  if (userId) invalidateUsers(queryClient, userId)

  if (shouldInvalidateCategories) void invalidateCategories(queryClient)
}
