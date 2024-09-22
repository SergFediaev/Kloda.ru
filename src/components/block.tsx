import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'div'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  isConstrained?: boolean
} & ComponentPropsWithoutRef<T>

export const Block = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  isConstrained,
  className,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'flex flex-col gap-8 rounded-3xl bg-surface p-6 shadow-lg dark:bg-surface-dark',
        isConstrained && 'w-full max-w-2xl',
        className,
      )}
      {...restProps}
    />
  )
}
