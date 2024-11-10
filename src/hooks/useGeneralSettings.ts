import { create } from 'zustand'

type GeneralSettings = {
  isEasterEggEnabled: boolean
  isDebugModeEnabled: boolean
  setIsEasterEggEnabled: (isEasterEggEnabled: boolean) => void
  setIsDebugModeEnabled: (isDebugModeEnabled: boolean) => void
}

export const useGeneralSettings = create<GeneralSettings>(set => ({
  isEasterEggEnabled: true,
  isDebugModeEnabled: false,
  setIsEasterEggEnabled: (isEasterEggEnabled: boolean) =>
    set({ isEasterEggEnabled }),
  setIsDebugModeEnabled: (isDebugModeEnabled: boolean) =>
    set({ isDebugModeEnabled }),
}))
