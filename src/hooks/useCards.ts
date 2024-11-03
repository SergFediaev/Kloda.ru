import {
  createCard,
  dislikeCard,
  favoriteCard,
  getCard,
  getCards,
  likeCard,
} from '@/api/cards/cards.api'
import type { CardsArgs } from '@/api/cards/cards.types'
import { getQueryClient } from '@/app/getQueryClient'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetCards = (args: CardsArgs) =>
  useQuery({
    queryKey: ['cards', ...Object.values(args)],
    queryFn: () => getCards(args),
  })

export const useGetCard = (id: string) =>
  useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
  })

export const useCreateCard = () =>
  useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      const queryClient = getQueryClient()
      void queryClient.invalidateQueries({ queryKey: ['cards'] })
      void queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

export const useLikeCard = () =>
  useMutation({
    mutationFn: likeCard,
    onSuccess: (_, variables) => invalidateCards(variables),
  })

export const useDislikeCard = () =>
  useMutation({
    mutationFn: dislikeCard,
    onSuccess: (_, variables) => invalidateCards(variables),
  })

export const useFavoriteCard = () =>
  useMutation({
    mutationFn: favoriteCard,
    onSuccess: (_, variables) => invalidateCards(variables),
  })

const invalidateCards = (id: number) => {
  const queryClient = getQueryClient()
  void queryClient.invalidateQueries({ queryKey: ['cards'] })
  void queryClient.invalidateQueries({ queryKey: ['card', String(id)] })
}
