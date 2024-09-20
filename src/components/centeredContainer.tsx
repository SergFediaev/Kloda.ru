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
      'w-full flex flex-grow justify-center items-center p-8',
    )}
  />
)
