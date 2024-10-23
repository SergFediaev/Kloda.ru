import { create } from 'zustand'

type CardsMode = {
  isStudyMode: boolean
  toggleStudyMode: () => void
}

export const useCardsMode = create<CardsMode>(set => ({
  isStudyMode: true,
  toggleStudyMode: () => set(state => ({ isStudyMode: !state.isStudyMode })),
}))
