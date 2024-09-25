import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  isError?: boolean
} & ComponentPropsWithoutRef<'p'>

// ToDo: Refactor all form errors
export const ErrorMessage = ({
  isError,
  children,
  className,
  ...restProps
}: Props) => (
  <p className={cn(isError && 'text-danger', className)} {...restProps}>
    {isError ? `Error: ${children}` : children}
  </p>
)
