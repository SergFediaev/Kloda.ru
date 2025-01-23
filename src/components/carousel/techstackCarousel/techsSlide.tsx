import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const TechsSlide = ({
  className,
  children,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn(
        'mx-5 min-w-0 flex-none basis-auto transform-gpu',
        className,
      )}
      {...restProps}
    >
      <div className='font-semibold text-background text-white text-xl dark:opacity-50'>
        {children}
      </div>
    </div>
  )
}
