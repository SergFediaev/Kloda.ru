import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { debugModeStore } from '@/stores/debugModeStore'

export const DebugModeSettings = () => {
  const { isMarkupShown, setIsMarkupShown } = debugModeStore()

  return (
    <Block heading='Debug mode' inColumns>
      <CheckBox
        isSelected={isMarkupShown}
        onValueChange={isSelected => setIsMarkupShown(isSelected)}
      >
        Show markup
      </CheckBox>
    </Block>
  )
}
