import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const CarouselSlide = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn(
        'translate-z-0 min-w-0 flex-shrink-0 basis-auto transform pl-10',
        className,
      )}
      {...restProps}
    />
  )
}