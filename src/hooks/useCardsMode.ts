import { useCardsSettings } from '@/hooks/useCardsSettings'
import { create } from 'zustand'

type CardsMode = {
  isStudyMode: boolean
  toggleStudyMode: () => void
}

export const useCardsMode = create<CardsMode>(set => ({
  isStudyMode: useCardsSettings.getState().isStudyModeDefault,
  toggleStudyMode: () => set(state => ({ isStudyMode: !state.isStudyMode })),
}))
