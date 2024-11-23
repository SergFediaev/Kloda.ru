import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type GeneralSettingsState = {
  isEasterEggEnabled: boolean
  isDebugModeEnabled: boolean
}

type GeneralSettingsActions = {
  setIsEasterEggEnabled: (isEasterEggEnabled: boolean) => void
  setIsDebugModeEnabled: (isDebugModeEnabled: boolean) => void
  resetGeneralSettings: () => void
}

const initialGeneralSettings: GeneralSettingsState = {
  isEasterEggEnabled: true,
  isDebugModeEnabled: false,
}

export const useGeneralSettings = create<
  GeneralSettingsState & GeneralSettingsActions
>()(
  devtools(
    persist(
      set => ({
        ...initialGeneralSettings,
        setIsEasterEggEnabled: (isEasterEggEnabled: boolean) =>
          set(
            { isEasterEggEnabled },
            undefined,
            'generalSettings/setIsEasterEggEnabled',
          ),
        setIsDebugModeEnabled: (isDebugModeEnabled: boolean) =>
          set(
            { isDebugModeEnabled },
            undefined,
            'generalSettings/setIsDebugModeEnabled',
          ),
        resetGeneralSettings: () =>
          set(
            initialGeneralSettings,
            undefined,
            'generalSettings/resetGeneralSettings',
          ),
      }),
      { name: 'generalSettings' },
    ),
  ),
)
