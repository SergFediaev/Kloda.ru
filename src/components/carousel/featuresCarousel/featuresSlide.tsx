import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const FeaturesSlide = ({
  className,
  children,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn(
        'w-full min-w-0 flex-none transform-gpu',
        'flex flex-col items-center gap-5 text-large',
        className,
      )}
      {...restProps}
    >
      <div className='max-w-2xl'>{children}</div>
    </div>
  )
}
