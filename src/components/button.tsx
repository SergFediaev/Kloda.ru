import { Loader } from '@/components/loader'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

// ToDo: isStretched
type ButtonProps = {
  isStretched?: boolean
  isLoading?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({
  children,
  className,
  isLoading,
  ...restProps
}: ButtonProps) => (
  <button
    {...restProps}
    className={cn(
      className,
      'rounded-3xl bg-orange-300 px-4 py-2',
      'hover:bg-orange-200 disabled:opacity-50 disabled:hover:bg-orange-300',
      'dark:bg-orange-700 dark:hover:bg-orange-800 dark:disabled:hover:bg-orange-700',
      isLoading && 'cursor-wait bg-orange-200 dark:bg-orange-800',
    )}
  >
    {isLoading ? <Loader /> : children}
  </button>
)
