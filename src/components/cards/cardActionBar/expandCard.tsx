import { Button } from '@/components/buttons/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

type Props = {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

export const ExpandCard = ({ isExpanded, setIsExpanded }: Props) => {
  const expandTitle = isExpanded ? 'Collapse' : 'Expand'
  const expandIcon = isExpanded ? <ChevronUp /> : <ChevronDown />

  const toggleIsExpanded = () => setIsExpanded(!isExpanded)

  return (
    <Button variant='text' onClick={toggleIsExpanded} title={expandTitle}>
      {expandIcon}
    </Button>
  )
}