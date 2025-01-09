import { Button } from '@/components/buttons/button'
import { cardsModeStore } from '@/stores/cardsModeStore'
import { Dumbbell, GraduationCap } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const CardsModeButton = () => {
  const { isStudyMode, toggleStudyMode } = cardsModeStore()

  const pathName = usePathname()
  const enabled = pathName === '/cards'

  const modeIcon = isStudyMode ? <Dumbbell /> : <GraduationCap />
  const modeTitle = isStudyMode ? 'Enable practice mode' : 'Enable study mode'

  return (
    <Button
      disabled={!enabled}
      variant='text'
      title={modeTitle}
      onClick={toggleStudyMode}
    >
      {modeIcon}
    </Button>
  )
}