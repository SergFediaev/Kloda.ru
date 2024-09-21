import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export const CenteredContainer = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    {...restProps}
    className={clsx(
      className,
      'flex w-full flex-grow items-center justify-center p-8',
    )}
  />
)
