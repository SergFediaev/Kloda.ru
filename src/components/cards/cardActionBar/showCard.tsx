import { Button } from '@/components/buttons/button'
import { Eye, EyeOff } from 'lucide-react'

type Props = {
  showContent: boolean
  setShowContent(showContent: boolean): void
}

export const ShowCard = ({ showContent, setShowContent }: Props) => {
  const showTitle = showContent ? 'Hide content' : 'Show content'
  const showIcon = showContent ? <EyeOff /> : <Eye />

  const toggleIsShown = () => {
    setShowContent(!showContent)
  }

  return (
    <Button variant='text' title={showTitle} onClick={toggleIsShown}>
      {showIcon}
    </Button>
  )
}