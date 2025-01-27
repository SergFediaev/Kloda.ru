'use client'

import type { EmblaCarouselType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }

    emblaApi.scrollPrev()

    if (onButtonClick) {
      onButtonClick(emblaApi)
    }
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) {
      return
    }

    emblaApi.scrollNext()

    if (onButtonClick) {
      onButtonClick(emblaApi)
    }
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onSelect(emblaApi)

    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type Props = ComponentPropsWithRef<'button'>

export const PrevButton = ({ children, ...restProps }: Props) => {
  return (
    <button
      className='touch-action: manipulation disabled: z-10 m-0 inline-flex h-12 w-12 flex-none cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-accent p-0 text-white hover:bg-accent-dark hover:bg-accent-neon dark:bg-accent-dark dark:hover:bg-accent'
      type='button'
      {...restProps}
    >
      <ChevronLeft strokeWidth={2} height={48} width={36} className='pr-1' />
      {children}
    </button>
  )
}

export const NextButton = ({ children, ...restProps }: Props) => {
  return (
    <button
      className='touch-action: manipulation z-10 m-0 inline-flex h-12 w-12 flex-none cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-full bg-accent text-white hover:bg-accent-dark hover:bg-accent-neon dark:bg-accent-dark dark:hover:bg-accent'
      type='button'
      {...restProps}
    >
      <ChevronRight strokeWidth={2} height={48} width={36} className='pl-1' />
      {children}
    </button>
  )
}
