import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Section = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'section'>) => {
  return <section className={cn('py-10', className)} {...restProps} />
}
