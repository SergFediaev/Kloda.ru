import { Loader } from '@/components/loader'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type ButtonVariant = 'primary' | 'text'

type Props = {
  variant?: ButtonVariant
  isStretched?: boolean
  isLoading?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({
  children,
  className,
  variant = 'primary',
  isStretched,
  isLoading,
  ...restProps
}: Props) => (
  <button
    className={cn(
      variant === 'primary' && [
        'rounded-3xl bg-accent-dark-variant px-4 py-2 hover:enabled:bg-accent-dark-alternate',
        'dark:bg-accent-variant dark:hover:enabled:bg-accent-alternate',
      ],
      variant === 'text' && [
        'text-accent hover:enabled:text-accent-variant',
        'dark:text-accent-dark dark:hover:enabled:text-accent-dark-variant',
      ],
      isStretched && 'flex-grow',
      isLoading &&
        'cursor-wait bg-accent-dark-alternate dark:bg-accent-alternate',
      className,
    )}
    {...restProps}
  >
    {isLoading ? <Loader /> : children}
  </button>
)
