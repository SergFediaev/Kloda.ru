import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Wrapper = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div {...restProps} className={cn('flex flex-wrap gap-x-4', className)} />
)
