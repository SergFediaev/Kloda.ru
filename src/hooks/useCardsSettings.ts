import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type CardsSettingsState = {
  isStudyModeDefault: boolean
  isCardAlwaysExpanded: boolean
  isMediaAlwaysShown: boolean
}

type CardsSettingsActions = {
  setIsStudyModeDefault: (isStudyModeDefault: boolean) => void
  setIsCardAlwaysExpanded: (isCardAlwaysExpanded: boolean) => void
  setIsMediaAlwaysShown: (isMediaAlwaysShown: boolean) => void
  resetCardsSettings: () => void
}

const initialCardsSettings: CardsSettingsState = {
  isStudyModeDefault: true,
  isCardAlwaysExpanded: false,
  isMediaAlwaysShown: true,
}

export const useCardsSettings = create<
  CardsSettingsState & CardsSettingsActions
>()(
  devtools(
    persist(
      set => ({
        ...initialCardsSettings,
        setIsStudyModeDefault: (isStudyModeDefault: boolean) =>
          set(
            { isStudyModeDefault },
            undefined,
            'cardsSettings/setIsStudyModeDefault',
          ),
        setIsCardAlwaysExpanded: (isCardAlwaysExpanded: boolean) =>
          set(
            { isCardAlwaysExpanded },
            undefined,
            'cardsSettings/setIsCardAlwaysExpanded',
          ),
        setIsMediaAlwaysShown: (isMediaAlwaysShown: boolean) =>
          set(
            { isMediaAlwaysShown },
            undefined,
            'cardsSettings/setIsMediaAlwaysShown',
          ),
        resetCardsSettings: () =>
          set(
            initialCardsSettings,
            undefined,
            'cardsSettings/resetCardsSettings',
          ),
      }),
      { name: 'cardsSettings' },
    ),
  ),
)
