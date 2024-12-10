import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'h2'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  isCentered?: boolean
  isSemiBold?: boolean
} & ComponentPropsWithoutRef<T>

// ToDo: Refactor semi-bold style, move to containers with footer and so on.
export const Heading = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  isCentered,
  isSemiBold,
  className,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'break-words text-2xl',
        isCentered && 'self-center',
        isSemiBold && 'font-semibold text-base',
        className,
      )}
      {...restProps}
    />
  )
}
