import { cn } from '@/utils/mergeClasses'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  isFilled?: boolean
  isDisabled?: boolean
}

export const FillIcon = ({ icon: Icon, isFilled, isDisabled }: Props) => (
  <Icon
    className={cn(
      isFilled && [
        'fill-accent dark:fill-accent-dark',
        !isDisabled &&
          'hover:fill-accent-variant dark:hover:fill-accent-dark-variant',
      ],
    )}
  />
)
