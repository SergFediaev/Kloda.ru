import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  isMarkerAccent?: boolean
} & ComponentPropsWithoutRef<'details'>

export const Details = ({
  isMarkerAccent = true,
  className,
  ...restProps
}: Props) => (
  <details
    className={cn(
      isMarkerAccent && 'marker:text-accent dark:marker:text-accent-dark',
      className,
    )}
    {...restProps}
  />
)
