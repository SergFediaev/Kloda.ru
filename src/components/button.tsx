import { Loader } from '@/components/loader'
import { clsx } from 'clsx'
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
    className={clsx(
      className,
      'bg-orange-300 hover:bg-orange-200 dark:bg-orange-700 dark:hover:bg-orange-800 rounded-3xl py-2 px-4 disabled:opacity-50 disabled:hover:bg-orange-300 disabled:dark:hover:bg-orange-700 disabled:cursor-not-allowed',
      isLoading && 'cursor-wait bg-orange-200 dark:bg-orange-800',
    )}
  >
    {isLoading ? <Loader /> : children}
  </button>
)
