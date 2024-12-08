import { create } from 'zustand'

type ScreensaverStartStore = {
  isScreensaverStarted: boolean
  setIsScreensaverStarted: (isScreensaverStarted: boolean) => void
}

export const screensaverStartStore = create<ScreensaverStartStore>(set => ({
  isScreensaverStarted: false,
  setIsScreensaverStarted: (isScreensaverStarted: boolean) =>
    set({ isScreensaverStarted }),
}))
