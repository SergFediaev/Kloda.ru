import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { create } from 'zustand'

type CardsModeStore = {
  isStudyMode: boolean
  toggleStudyMode: () => void
}

export const cardsModeStore = create<CardsModeStore>(set => ({
  isStudyMode: cardsSettingsStore.getState().isStudyModeDefault,
  toggleStudyMode: () => set(state => ({ isStudyMode: !state.isStudyMode })),
}))
