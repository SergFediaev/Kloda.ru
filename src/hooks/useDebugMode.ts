import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type DebugModeState = {
  isMarkupShown: boolean
}

type DebugModeActions = {
  setIsMarkupShown: (isMarkupShown: boolean) => void
  resetDebugMode: () => void
}

const initialDebugMode: DebugModeState = {
  isMarkupShown: false,
}

export const useDebugMode = create<DebugModeState & DebugModeActions>()(
  devtools(
    persist(
      set => ({
        ...initialDebugMode,
        setIsMarkupShown: (isMarkupShown: boolean) =>
          set({ isMarkupShown }, undefined, 'debugMode/setIsMarkupShown'),
        resetDebugMode: () =>
          set(initialDebugMode, undefined, 'debugMode/resetDebugMode'),
      }),
      { name: 'debugMode' },
    ),
  ),
)
