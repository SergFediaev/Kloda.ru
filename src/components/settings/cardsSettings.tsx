import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { Select } from '@/components/pageControls/select'
import { cardsSettingsStore } from '@/stores/cardsSettingsStore'
import { SelectItem } from '@nextui-org/select'
import { Dumbbell, GraduationCap } from 'lucide-react'

const MODES = ['Study mode', 'Practice mode'] as const

export const CardsSettings = () => {
  const {
    isStudyModeDefault,
    isCardAlwaysExpanded,
    isMediaAlwaysShown,
    setIsStudyModeDefault,
    setIsCardAlwaysExpanded,
    setIsMediaAlwaysShown,
  } = cardsSettingsStore()

  const mode = MODES[isStudyModeDefault ? 0 : 1]
  const icon = isStudyModeDefault ? <GraduationCap /> : <Dumbbell />
  const description = isStudyModeDefault
    ? 'Card content shown'
    : 'Card content hidden'

  return (
    <Block heading='Cards' inColumns>
      <Select
        label='Default cards mode'
        selectedKeys={[mode]}
        onChange={({ target: { value } }) =>
          setIsStudyModeDefault(value === MODES[0])
        }
        labelPlacement='outside-left'
        endContent={icon}
        description={description}
        isHorizontal
      >
        {MODES.map(mode => (
          <SelectItem key={mode}>{mode}</SelectItem>
        ))}
      </Select>
      <CheckBox
        isSelected={isCardAlwaysExpanded}
        onValueChange={isSelected => setIsCardAlwaysExpanded(isSelected)}
      >
        Expand cards on dashboard
      </CheckBox>
      <CheckBox
        isSelected={isMediaAlwaysShown}
        onValueChange={isSelected => setIsMediaAlwaysShown(isSelected)}
      >
        Show cards media content on dashboard
      </CheckBox>
    </Block>
  )
}
