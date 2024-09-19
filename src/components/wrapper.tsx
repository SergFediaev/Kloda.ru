import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export const Wrapper = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    {...restProps}
    className={clsx(className, 'flex justify-between flex-wrap gap-x-4')}
  />
)
