import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'h2'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  isCentered?: boolean
} & ComponentPropsWithoutRef<T>

export const Heading = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  isCentered,
  className,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn('text-2xl', isCentered && 'self-center', className)}
      {...restProps}
    />
  )
}
