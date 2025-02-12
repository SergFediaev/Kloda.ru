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
  DislikeResponse,
  FavoriteResponse,
  LikeResponse,
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
      void invalidateCard(queryClient, String(id))
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
      invalidateUser(queryClient, String(userId))
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

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })

export const useLikeCard = (userId?: string) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: likeCard,
    onMutate: async id => {
      await queryClient.cancelQueries({
        queryKey: ['card', String(id)],
      })

      const prevCard = queryClient.getQueryData<LikeResponse>([
        'card',
        String(id),
      ])

      queryClient.setQueryData<LikeResponse, string[], LikeResponse>(
        ['card', id],
        old => {
          return {
            isLiked: !old?.isLiked,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['card', String(cardId)], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['card', String(cardId)], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void queryClient.invalidateQueries({ queryKey: ['card', String(cardId)] })
      void queryClient.invalidateQueries({ queryKey: ['cards'] })
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

export const useDislikeCard = (userId?: string) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: dislikeCard,
    onMutate: async id => {
      await queryClient.cancelQueries({
        queryKey: ['card', String(id)],
      })

      const prevCard = queryClient.getQueryData<DislikeResponse>([
        'card',
        String(id),
      ])

      queryClient.setQueryData<DislikeResponse, string[], DislikeResponse>(
        ['card', id],
        old => {
          return {
            isDisliked: !old?.isDisliked,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['card', String(cardId)], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['card', String(cardId)], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void queryClient.invalidateQueries({ queryKey: ['card', String(cardId)] })
      void queryClient.invalidateQueries({ queryKey: ['cards'] })
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

export const useFavoriteCard = (userId?: string) => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: favoriteCard,
    onMutate: async id => {
      await queryClient.cancelQueries({
        queryKey: ['card', String(id)],
      })

      const prevCard = queryClient.getQueryData<FavoriteResponse>([
        'card',
        String(id),
      ])

      queryClient.setQueryData<FavoriteResponse, string[], FavoriteResponse>(
        ['card', id],
        old => {
          return {
            isFavorite: !old?.isFavorite,
          }
        },
      )

      return { prevCard }
    },
    onError: (error, cardId, context) => {
      queryClient.setQueryData(['card', String(cardId)], context?.prevCard)
      throw error
    },
    onSuccess: (data, cardId) => {
      queryClient.setQueryData(['card', String(cardId)], data)
    },
    onSettled: (_data, _error, cardId: string) => {
      void queryClient.invalidateQueries({ queryKey: ['card', String(cardId)] })
      void queryClient.invalidateQueries({ queryKey: ['cards'] })
      invalidateUsers(queryClient)

      if (userId) {
        invalidateUser(queryClient, String(userId))
      }
    },
  })
}

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
