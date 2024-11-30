import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Capitalize = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'span'>) => (
  <span className={cn('capitalize', className)} {...restProps} />
)
