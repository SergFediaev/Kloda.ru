import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ScreensaverState = {
  isEnabled: boolean
  minutesToActivate: number
}

type ScreensaverActions = {
  setIsEnabled: (isEnabled: boolean) => void
  setMinutesToActivate: (minutesToActivate: number) => void
  resetScreensaver: () => void
}

const initialScreensaver: ScreensaverState = {
  isEnabled: true,
  minutesToActivate: 5,
}

export const screensaverStore = create<ScreensaverState & ScreensaverActions>()(
  devtools(
    persist(
      set => ({
        ...initialScreensaver,
        setIsEnabled: (isEnabled: boolean) =>
          set({ isEnabled }, undefined, 'screensaver/setIsEnabled'),
        setMinutesToActivate: (minutesToActivate: number) =>
          set(
            { minutesToActivate },
            undefined,
            'screensaver/setMinutesToActivate',
          ),
        resetScreensaver: () =>
          set(initialScreensaver, undefined, 'screensaver/resetScreensaver'),
      }),
      { name: 'screensaver' },
    ),
  ),
)
