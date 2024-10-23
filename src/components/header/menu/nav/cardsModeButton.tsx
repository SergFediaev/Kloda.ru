import { Button } from '@/components/button'
import { useCardsMode } from '@/hooks/useCardsMode'
import { Dumbbell, GraduationCap } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const CardsModeButton = () => {
  const { isStudyMode, toggleStudyMode } = useCardsMode()

  if (usePathname() !== '/') {
    return null
  }

  const modeIcon = isStudyMode ? <Dumbbell /> : <GraduationCap />
  const modeTitle = isStudyMode ? 'Enable practice mode' : 'Enable study mode'

  return (
    <Button variant='text' title={modeTitle} onClick={toggleStudyMode}>
      {modeIcon}
    </Button>
  )
}
