'use client'

import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type PropType = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

const TechCarouselContainer = ({ className, children, ...rest }: PropType) => {
  return (
    <div
      className={cn('flex touch-pan-y touch-pinch-zoom ', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default TechCarouselContainer
