import { cn } from '@/utils/mergeClasses'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'text'

type Props = {
  variant?: Variant
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
      'flex items-center justify-center',
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
        'cursor-progress bg-accent-dark-alternate dark:bg-accent-alternate',
      className,
    )}
    {...restProps}
  >
    {children}
    {isLoading && (
      <>
        &nbsp;
        <LoaderCircle size={16} className='animate-spin' />
      </>
    )}
  </button>
)
