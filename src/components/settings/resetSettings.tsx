import { Button } from '@/components/buttons/button'
import { Block } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { debugModeStore } from '@/stores/debugModeStore'
import { generalSettingsStore } from '@/stores/generalSettingsStore'
import { screensaverStore } from '@/stores/screensaverStore'
import { useTheme } from 'next-themes'
import { toast } from 'react-toastify'

export const ResetSettings = () => {
  const { resetGeneralSettings } = generalSettingsStore()
  const { resetDebugMode } = debugModeStore()
  const { resetCardsSettings } = cardsSettingsStore()
  const { resetScreensaver } = screensaverStore()
  const { theme } = useTheme()

  const clearSessionStorage = () => {
    sessionStorage.clear()
    toast('Session storage cleared', { theme, type: 'info' })
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    toast('Local storage cleared', { theme, type: 'info' })
  }

  const onReset = () => {
    resetGeneralSettings()
    resetDebugMode()
    resetCardsSettings()
    resetScreensaver()
    toast('All settings are reset to defaults', { theme, type: 'info' })
  }

  return (
    <Block heading='Reset' inColumns>
      <ButtonsContainer>
        <Button isStretched onClick={clearSessionStorage}>
          Clear session storage
        </Button>
        <Button isStretched onClick={clearLocalStorage}>
          Clear local storage
        </Button>
      </ButtonsContainer>
      <Button isDanger onClick={onReset}>
        Reset all settings to defaults
      </Button>
    </Block>
  )
}
