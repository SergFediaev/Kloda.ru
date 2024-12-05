'use client'

import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { debugModeStore } from '@/stores/debugModeStore'
import { generalSettingsStore } from '@/stores/generalSettingsStore'

export const GeneralSettings = () => {
  const {
    isEasterEggEnabled,
    isDebugModeEnabled,
    setIsEasterEggEnabled,
    setIsDebugModeEnabled,
  } = generalSettingsStore()

  const { isMarkupShown, setIsMarkupShown } = debugModeStore()

  const onChangeDebugMode = (isSelected: boolean) => {
    setIsDebugModeEnabled(isSelected)

    if (!isSelected && isMarkupShown) setIsMarkupShown(false)
  }

  return (
    <Block heading='General' inColumns>
      <CheckBox
        isSelected={isEasterEggEnabled}
        onValueChange={isSelected => setIsEasterEggEnabled(isSelected)}
      >
        Enable easter egg
      </CheckBox>
      <CheckBox
        isSelected={isDebugModeEnabled}
        onValueChange={isSelected => onChangeDebugMode(isSelected)}
      >
        Enable debug mode
      </CheckBox>
    </Block>
  )
}
