import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const CarouselContainer = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={cn('-ml-5 flex touch-auto', className)} {...restProps} />
  )
}