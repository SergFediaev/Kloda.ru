import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import { cardsModeStore } from '@/stores/cardsModeStore'
import { Dumbbell, GraduationCap } from 'lucide-react'

export const CardsModeButton = () => {
  const { isStudyMode, toggleStudyMode } = cardsModeStore()
  const { isCardsPath } = usePaths()

  const modeIcon = isStudyMode ? <Dumbbell /> : <GraduationCap />
  const modeTitle = isStudyMode ? 'Enable practice mode' : 'Enable study mode'

  return (
    <Button
      isDisabled={!isCardsPath}
      variant='text'
      title={modeTitle}
      onClick={toggleStudyMode}
    >
      {modeIcon}
    </Button>
  )
}