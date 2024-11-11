import { cn } from '@/utils/mergeClasses'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'text' | 'floating' | 'round'

type Props = {
  variant?: Variant
  isStretched?: boolean
  isLoading?: boolean
  isBlocked?: boolean
  isDanger?: boolean
} & ComponentPropsWithoutRef<'button'>

// ToDo: Refactor styles
export const Button = ({
  children,
  className,
  variant = 'primary',
  isStretched,
  isLoading,
  isBlocked,
  isDanger,
  ...restProps
}: Props) => (
  <button
    className={cn(
      'flex items-center justify-center',
      variant === 'primary' && ['rounded-3xl px-4 py-2'],
      variant === 'primary' &&
        !isDanger && [
          'bg-accent-dark-variant hover:enabled:bg-accent-dark-alternate',
          'dark:bg-accent-variant dark:hover:enabled:bg-accent-alternate',
        ],
      variant === 'primary' &&
        isDanger && [
          'bg-danger hover:enabled:bg-danger-variant',
          'dark:bg-danger-dark dark:hover:enabled:bg-danger-dark-variant',
          'text-primary-dark dark:text-primary',
        ],
      variant === 'text' &&
        !isDanger && [
          'text-accent hover:enabled:text-accent-variant',
          'dark:text-accent-dark dark:hover:enabled:text-accent-dark-variant',
        ],
      variant === 'text' &&
        isDanger && [
          'text-danger hover:enabled:text-danger-variant',
          'dark:text-danger-dark dark:hover:enabled:text-danger-dark-variant',
        ],
      variant === 'floating' &&
        'fixed right-0 z-10 rounded-bl-full bg-accent-dark-variant pt-2 pr-2 pb-5 pl-5 opacity-50 transition hover:opacity-100 dark:bg-accent-variant',
      variant === 'round' &&
        'h-8 w-8 rounded-full bg-accent-dark-variant font-bold hover:enabled:bg-accent-dark-alternate dark:bg-accent-variant dark:hover:enabled:bg-accent-alternate',
      isStretched && 'flex-grow',
      isLoading &&
        'cursor-progress bg-accent-dark-alternate dark:bg-accent-alternate',
      isBlocked && 'cursor-not-allowed',
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
