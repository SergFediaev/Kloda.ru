import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Aside = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'aside'>) => {
  return (
    <aside
      className={cn('flex max-w-64 flex-col gap-5', className)}
      {...restProps}
    />
  )
}
