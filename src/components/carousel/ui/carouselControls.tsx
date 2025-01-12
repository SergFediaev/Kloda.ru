import { CarouselDots } from '@/components/carousel/ui/carouselDots'
import { NextButton } from '@/components/carousel/ui/carouselNextButton'
import { PrevButton } from '@/components/carousel/ui/carouselPrevButton'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithRef } from 'react'

type CarouselControlsProps = {
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  scrollSnaps: number[]
} & ComponentPropsWithRef<'div'>

export const CarouselControls = ({
  onPrevButtonClick,
  onNextButtonClick,
  prevBtnDisabled,
  nextBtnDisabled,
  scrollSnaps,
  className,
  ref,
  ...restProps
}: CarouselControlsProps) => {
  return (
    <div
      className={cn('flex max-w-64 flex-col gap-5', className)}
      ref={ref}
      {...restProps}
    >
      <div className='embla__buttons'>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      <CarouselDots scrollSnaps={scrollSnaps} />
    </div>
  )
}