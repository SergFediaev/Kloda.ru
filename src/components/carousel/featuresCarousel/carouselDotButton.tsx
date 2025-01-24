'use client'

import type { EmblaCarouselType } from 'embla-carousel'
import {
  type ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return
      }

      emblaApi.scrollTo(index)

      if (onButtonClick) {
        onButtonClick(emblaApi)
      }
    },
    [emblaApi, onButtonClick],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) {
      return
    }

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type Props = ComponentPropsWithRef<'button'>

export const DotButton = ({ children, ...restProps }: Props) => {
  return (
    <button type='button' {...restProps}>
      {children}
    </button>
  )
}
