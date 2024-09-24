import { createCard, getCard, getCards } from '@/api/cards/cards.api'
import { getQueryClient } from '@/app/getQueryClient'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetCards = () =>
  useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })

export const useGetCard = (id: string) =>
  useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id),
  })

export const useCreateCard = () =>
  useMutation({
    mutationFn: createCard,
    onSuccess: () =>
      getQueryClient().invalidateQueries({ queryKey: ['cards'] }),
  })
