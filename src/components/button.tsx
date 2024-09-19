import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

// ToDo: isStretched
type ButtonProps = {
  isStretched?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({ className, ...restProps }: ButtonProps) => (
  <button
    {...restProps}
    className={clsx(
      className,
      'bg-orange-300 hover:bg-orange-200 dark:bg-orange-700 dark:hover:bg-orange-800 rounded-3xl py-2 px-4',
    )}
  />
)
