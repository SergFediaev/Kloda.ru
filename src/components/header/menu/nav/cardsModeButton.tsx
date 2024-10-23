import { Button } from '@/components/button'
import { useCardsMode } from '@/hooks/useCardsMode'
import { Dumbbell, GraduationCap } from 'lucide-react'

export const CardsModeButton = () => {
  const { isStudyMode, toggleStudyMode } = useCardsMode()
  const modeIcon = isStudyMode ? <Dumbbell /> : <GraduationCap />
  const modeTitle = isStudyMode ? 'Enable practice mode' : 'Enable study mode'

  return (
    <Button variant='text' title={modeTitle} onClick={toggleStudyMode}>
      {modeIcon}
    </Button>
  )
}
