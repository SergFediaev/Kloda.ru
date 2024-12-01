import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'span'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  isCentered?: boolean
  isRightAligned?: boolean
  isCapitalize?: boolean
  isUnformatted?: boolean
  isAccent?: boolean
  isMono?: boolean
  isDanger?: boolean
} & ComponentPropsWithoutRef<T>

export const Text = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  isCentered,
  isRightAligned,
  isCapitalize,
  isUnformatted,
  isAccent,
  isMono,
  isDanger,
  className,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        isCentered && 'text-center',
        isRightAligned && 'self-end',
        isCapitalize && 'capitalize',
        isUnformatted && 'whitespace-pre-wrap break-words',
        isAccent && 'text-accent dark:text-accent-dark',
        isMono && 'font-mono',
        isDanger && 'text-danger',
        className,
      )}
      {...restProps}
    />
  )
}
