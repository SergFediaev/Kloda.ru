import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

export const Container = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div {...restProps} className={clsx(className, 'container mx-auto p-8')} />
)
