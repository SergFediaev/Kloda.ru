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
      'rounded-3xl bg-accent-dark-variant px-4 py-2',
      'hover:bg-accent-dark-alternate disabled:opacity-50 disabled:hover:bg-accent-dark-variant',
      'dark:bg-accent-variant dark:hover:bg-accent-alternate dark:disabled:hover:bg-accent-variant',
      isLoading &&
        'cursor-wait bg-accent-dark-alternate dark:bg-accent-alternate',
    )}
  >
    {isLoading ? <Loader /> : children}
  </button>
)
