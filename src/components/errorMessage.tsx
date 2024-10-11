import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  isError?: boolean
  isCentered?: boolean
} & ComponentPropsWithoutRef<'p'>

// ToDo: Refactor all form errors
export const ErrorMessage = ({
  isError,
  isCentered,
  children,
  className,
  ...restProps
}: Props) => (
  <p
    className={cn(
      isError && 'text-danger',
      isCentered && 'text-center',
      className,
    )}
    {...restProps}
  >
    {isError ? `Error: ${children}` : children}
  </p>
)
