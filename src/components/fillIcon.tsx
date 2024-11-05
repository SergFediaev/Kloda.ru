import { cn } from '@/utils/mergeClasses'
import type { LucideIcon } from 'lucide-react'

type Icon = {
  icon: LucideIcon
  isFilled?: boolean
}

export const FillIcon = ({ icon: Component, isFilled }: Icon) => (
  <Component
    className={cn(
      isFilled &&
        'fill-accent hover:fill-accent-variant dark:fill-accent-dark dark:hover:fill-accent-dark-variant',
    )}
  />
)
