import { cn } from '@/utils/mergeClasses'
import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  isFilled?: boolean
}

export const FillIcon = ({ icon: Icon, isFilled }: Props) => (
  <Icon
    className={cn(
      isFilled &&
        'fill-accent hover:fill-accent-variant dark:fill-accent-dark dark:hover:fill-accent-dark-variant',
    )}
  />
)
