import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Summary = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'summary'>) => (
  <summary className={cn('cursor-pointer', className)} {...restProps} />
)
