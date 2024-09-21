import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const CenteredContainer = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    {...restProps}
    className={cn(
      'flex w-full flex-grow items-center justify-center p-6',
      className,
    )}
  />
)
