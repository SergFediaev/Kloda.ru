'use client'

import { CarouselContainer } from '@/components/carousel/ui/carouselContainer'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type React from 'react'
import { useCallback } from 'react'

import { CarouselSlidesSet } from '@/components/carousel/carouselSlidesSet'
import { useDotButton } from '@/components/carousel/hooks/useDotButton'
import { usePrevNextButtons } from '@/components/carousel/hooks/usePrevNextButtons'
import { CarouselControls } from '@/components/carousel/ui/carouselControls'
import { CarouselViewPort } from '@/components/carousel/ui/carouselViewPort'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const Carousel = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className='embla'>
      <CarouselViewPort ref={emblaRef}>
        <CarouselContainer>
          <CarouselSlidesSet />
        </CarouselContainer>
      </CarouselViewPort>
      <CarouselControls
        onNextButtonClick={onNextButtonClick}
        nextBtnDisabled={nextBtnDisabled}
        prevBtnDisabled={prevBtnDisabled}
        onPrevButtonClick={onPrevButtonClick}
        scrollSnaps={scrollSnaps}
      />
    </section>
  )
}

export default Carousel