import { cn } from '@/utils/mergeClasses'
import type { LucideIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  icon: LucideIcon
} & ComponentPropsWithoutRef<'p'>

export const IconText = ({
  icon: Icon,
  children,
  className,
  ...restProps
}: Props) => (
  <p {...restProps}>
    <Icon
      className={cn(
        'float-left mr-4 text-accent dark:text-accent-dark',
        className,
      )}
    />
    {children}
  </p>
)
