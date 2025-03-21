import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Subheading = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-col flex-wrap items-center justify-center gap-5 text-primary-intense sm:flex-row sm:justify-start dark:text-primary-dark',
        className,
      )}
      {...restProps}
    />
  )
}
