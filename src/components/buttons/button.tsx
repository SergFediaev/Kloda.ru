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
        'flex items-center justify-center transition',
        (variant === 'primary' || variant === 'outline') &&
          'rounded-3xl px-4 py-2',
        variant === 'primary' && [
          'bg-accent hover:enabled:bg-accent-dark',
          'dark:bg-accent-dark dark:hover:enabled:bg-accent',
          'text-primary-dark no-underline',
        ],
        variant === 'primary' &&
          isDanger && [
            'bg-danger hover:enabled:bg-danger-dark',
            'dark:bg-danger-dark dark:hover:enabled:bg-danger',
            'text-primary-dark',
          ],
        variant === 'text' && [
          'text-accent hover:enabled:text-accent-dark',
          'dark:text-accent-dark dark:hover:enabled:text-accent',
        ],
        variant === 'text' &&
          isDanger && [
            'text-danger hover:enabled:text-danger-dark',
            'dark:text-danger-dark dark:hover:enabled:text-danger',
          ],
        variant === 'floating' &&
          'fixed right-0 z-30 m-6 rounded-full bg-accent p-4 text-primary-dark transition hover:bg-accent-dark dark:bg-accent-dark dark:hover:bg-accent',
        variant === 'round' &&
          'h-8 w-8 rounded-full bg-accent font-bold hover:enabled:bg-accent-dark dark:bg-accent-dark dark:hover:bg-accent',
        variant === 'outline' &&
          'border-2 text-white no-underline hover:text-white',
        isStretched && 'flex-grow',
        isLoading && 'cursor-progress',
        isLoading &&
          variant !== 'text' &&
          variant !== 'outline' &&
          'bg-accent dark:bg-accent-dark',
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