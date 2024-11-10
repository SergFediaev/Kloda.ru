import { cn } from '@/utils/mergeClasses'
import type { LucideIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  icon: LucideIcon
  isReversed?: boolean
} & ComponentPropsWithoutRef<'span'>

export const AnimatedIcon = ({
  icon: Icon,
  isReversed,
  ...restProps
}: Props) => (
  <span {...restProps}>
    <Icon
      size={16}
      className={cn(
        'fill-accent stroke-0 dark:fill-accent-dark',
        isReversed ? 'animate-heartbeat-reverse' : 'animate-heartbeat',
      )}
    />
  </span>
)
