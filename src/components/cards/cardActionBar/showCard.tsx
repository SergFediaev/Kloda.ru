import { Button } from '@/components/buttons/button'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  isShown: boolean
  setIsShown(isShown: boolean): void
}

export const ShowCard = ({ isShown, setIsShown }: Props) => {
  const showTitle = isShown ? 'Hide content' : 'Show content'
  const showIcon = isShown ? <EyeOff /> : <Eye />

  const toggleIsShown = () => {
    setIsShown(!isShown)
  }

  return (
    <Button variant='text' title={showTitle} onClick={toggleIsShown}>
      {showIcon}
    </Button>
  )
}