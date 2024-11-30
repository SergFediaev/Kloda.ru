import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const OrderedList = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'ol'>) => (
  <ol
    className={cn('list-inside list-decimal font-mono', className)}
    {...restProps}
  />
)
