import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithRef, ComponentPropsWithoutRef } from 'react'

export const CarouselViewPort = ({
  className,
  ref,
  ...restProps
}: ComponentPropsWithRef<'div'>) => {
  return (
    <div
      className={cn('overflow-hidden', className)}
      {...restProps}
      ref={ref}
    />
  )
}
