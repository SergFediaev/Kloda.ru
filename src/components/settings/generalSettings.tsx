'use client'

import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { useDebugMode } from '@/hooks/useDebugMode'
import { useGeneralSettings } from '@/hooks/useGeneralSettings'

export const GeneralSettings = () => {
  const {
    isEasterEggEnabled,
    isDebugModeEnabled,
    setIsEasterEggEnabled,
    setIsDebugModeEnabled,
  } = useGeneralSettings()

  const { isMarkupShown, setIsMarkupShown } = useDebugMode()

  const onChangeDebugMode = (isSelected: boolean) => {
    setIsDebugModeEnabled(isSelected)

    if (!isSelected && isMarkupShown) setIsMarkupShown(false)
  }

  return (
    <Block heading='General settings' inColumns>
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
