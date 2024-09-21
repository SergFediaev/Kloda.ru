import { Loader } from '@/components/loader'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'text'

// ToDo: isStretched
type ButtonProps = {
  variant?: ButtonVariant
  isStretched?: boolean
  isLoading?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({
  children,
  className,
  variant = 'primary',
  isLoading,
  ...restProps
}: ButtonProps) => (
  <button
    {...restProps}
    className={cn(
      variant === 'primary' && [
        'rounded-3xl bg-accent-dark-variant px-4 py-2',
        'hover:bg-accent-dark-alternate disabled:hover:bg-accent-dark-variant',
        'dark:bg-accent-variant dark:hover:bg-accent-alternate dark:disabled:hover:bg-accent-variant',
      ],
      variant === 'text' &&
        'text-accent hover:text-accent-variant dark:text-accent-dark dark:hover:text-accent-dark-variant',
      isLoading &&
        'cursor-wait bg-accent-dark-alternate dark:bg-accent-alternate',
      className,
    )}
  >
    {isLoading ? <Loader /> : children}
  </button>
)
