import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Columns = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn('columns-lg gap-x-6 space-y-6', className)}
    {...restProps}
  />
)
