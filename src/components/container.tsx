import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Container = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div {...restProps} className={cn('container mx-auto p-8', className)} />
)
