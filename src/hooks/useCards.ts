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

export const useCreateCard = (authorId: string) =>
  useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUser(queryClient, authorId)
      invalidateUsers(queryClient)
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

export const useDeleteCards = (userId: string) =>
  useMutation({
    mutationFn: deleteCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient)
      invalidateUser(queryClient, userId)
    },
  })

export const useDeleteCard = (userId?: string) =>
  useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUsers(queryClient)
      userId ? invalidateUser(queryClient, userId) : null
    },
  })

export const useLikeCard = (userId?: string) =>
  useMutation({
    mutationFn: likeCard,
    onSuccess: (_, cardId) => {
      const queryClient = getQueryClient()
      void invalidateCard(queryClient, cardId)
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)
      userId ? invalidateUser(queryClient, userId) : null
    },
  })

export const useDislikeCard = (userId?: string) =>
  useMutation({
    mutationFn: dislikeCard,
    onSuccess: (_, cardId) => {
      const queryClient = getQueryClient()
      void invalidateCard(queryClient, cardId)
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)
      userId ? invalidateUser(queryClient, userId) : null
    },
  })

export const useFavoriteCard = (userId?: string) =>
  useMutation({
    mutationFn: favoriteCard,
    onSuccess: (_, cardId) => {
      const queryClient = getQueryClient()
      void invalidateCard(queryClient, cardId)
      void invalidateCards(queryClient)
      invalidateUsers(queryClient)
      userId ? invalidateUser(queryClient, userId) : null
    },
  })

// ToDo: Refactor invalidating, duplicated with create card, also invalidate only one user
export const useImportCards = (userId: string) =>
  useMutation({
    mutationFn: importCards,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void invalidateCards(queryClient)
      void invalidateCategories(queryClient)
      invalidateUser(queryClient, userId)
      invalidateUsers(queryClient)
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
const invalidateCard = (queryClient: QueryClient, cardId: string) =>
  queryClient.invalidateQueries({ queryKey: ['card', cardId] })

// noinspection Annotator
const invalidateCategories = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: ['categories'] })

const invalidateUser = (queryClient: QueryClient, userId: string) => {
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['user', userId] })
}

const invalidateUsers = (queryClient: QueryClient) => {
  // noinspection Annotator
  void queryClient.invalidateQueries({ queryKey: ['users'] })
}