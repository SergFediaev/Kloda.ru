import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { useDebugMode } from '@/hooks/useDebugMode'

export const DebugModeSettings = () => {
  const { isMarkupShown, setIsMarkupShown } = useDebugMode()

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
