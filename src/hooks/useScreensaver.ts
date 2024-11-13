import { create } from 'zustand'

type Screensaver = {
  isEnabled: boolean
  minutesToActivate: number
  setIsEnabled: (isEnabled: boolean) => void
  setMinutesToActivate: (minutesToActivate: number) => void
}

export const useScreensaver = create<Screensaver>(set => ({
  isEnabled: true,
  minutesToActivate: 5,
  setIsEnabled: (isEnabled: boolean) => set({ isEnabled }),
  setMinutesToActivate: (minutesToActivate: number) =>
    set({ minutesToActivate }),
}))
