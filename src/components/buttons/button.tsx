import { cn } from '@/utils/mergeClasses'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const DEFAULT_TYPE = 'button'

type Variant = 'primary' | 'text' | 'floating' | 'round' | 'outline'

type Props<T extends ElementType = typeof DEFAULT_TYPE> = {
  as?: T
  variant?: Variant
  isStretched?: boolean
  isLoading?: boolean
  isBlocked?: boolean
  isDanger?: boolean
  isTextLeft?: boolean
  isDisabled?: boolean
} & ComponentPropsWithoutRef<T>

// ToDo: Refactor styles
export const Button = <T extends ElementType = typeof DEFAULT_TYPE>({
  as,
  children,
  className,
  disabled,
  variant = 'primary',
  isStretched,
  isLoading,
  isBlocked,
  isDanger,
  isTextLeft,
  isDisabled,
  ...restProps
}: Props<T>) => {
  const Component = as ?? DEFAULT_TYPE

  return (
    <Component
      className={cn(
        'flex items-center justify-center',
        (variant === 'primary' || variant === 'outline') &&
          'rounded-3xl px-4 py-2',
        variant === 'primary' &&
          !isDanger && [
            'bg-accent-dark-variant hover:enabled:bg-accent-dark-alternate',
            'dark:bg-accent-variant dark:hover:enabled:bg-accent-alternate',
            'text-primary no-underline dark:text-primary-dark',
            'hover:text-primary hover:dark:text-primary-dark',
            !disabled &&
              'hover:bg-accent-dark-alternate hover:dark:bg-accent-alternate',
          ],
        variant === 'primary' &&
          isDanger && [
            'bg-danger hover:enabled:bg-danger-variant',
            'dark:bg-danger dark:hover:enabled:bg-danger-dark-variant',
            'text-primary-dark dark:text-primary-dark',
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
          'fixed right-0 z-30 rounded-bl-full bg-accent-dark-variant pt-2 pr-2 pb-5 pl-5 opacity-50 transition hover:opacity-100 dark:bg-accent-variant',
        variant === 'round' &&
          'h-8 w-8 rounded-full bg-accent-dark-variant font-bold hover:enabled:bg-accent-dark-alternate dark:bg-accent-variant dark:hover:enabled:bg-accent-alternate',
        variant === 'outline' &&
          'border-2 text-white no-underline hover:text-white',
        isStretched && 'flex-grow',
        isLoading && 'cursor-progress',
        isLoading &&
          variant !== 'text' &&
          variant !== 'outline' &&
          'bg-accent-dark-alternate dark:bg-accent-alternate',
        isBlocked && 'cursor-not-allowed',
        isTextLeft && 'text-left',
        isDisabled &&
          'cursor-auto opacity-50 hover:text-accent dark:hover:text-accent-dark',
        className,
      )}
      disabled={disabled || isDisabled}
      {...restProps}
    >
      {children}
      {isLoading && (
        <>
          &nbsp;
          <LoaderCircle size={16} className='animate-spin' />
        </>
      )}
    </Component>
  )
}
