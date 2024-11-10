import { create } from 'zustand/index'

type DebugMode = {
  isMarkupShown: boolean
  setIsMarkupShown: (isMarkupShown: boolean) => void
}

export const useDebugMode = create<DebugMode>(set => ({
  isMarkupShown: false,
  setIsMarkupShown: (isMarkupShown: boolean) => set({ isMarkupShown }),
}))
