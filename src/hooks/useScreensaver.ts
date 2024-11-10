import { create } from 'zustand'

type Screensaver = {
  isEnabled: boolean
  secondsToActivate: number
  setIsEnabled: (isEnabled: boolean) => void
  setSecondsToActivate: (secondsToActivate: number) => void
}

export const useScreensaver = create<Screensaver>(set => ({
  isEnabled: true,
  secondsToActivate: 30,
  setIsEnabled: (isEnabled: boolean) => set({ isEnabled }),
  setSecondsToActivate: (secondsToActivate: number) =>
    set({ secondsToActivate }),
}))
