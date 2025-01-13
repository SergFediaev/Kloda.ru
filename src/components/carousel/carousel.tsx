'use client'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/carousel/carouselArrowButtons'
import {
  DotButton,
  useDotButton,
} from '@/components/carousel/carouselDotButton'
import { Slide } from '@/components/carousel/slide'
import {
  CategoriesSlide,
  CustomizationSlide,
  HandsfreeSlide,
  ManagementSlide,
  MediaSlide,
  ModesSlide,
  PlaylistsSlide,
} from '@/components/carousel/slides'
import { cn } from '@/utils/mergeClasses'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type React from 'react'
import { useCallback } from 'react'

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
    <section>
      <div ref={emblaRef} className='overflow-hidden '>
        <div className='flex touch-pan-y touch-pinch-zoom items-center'>
          <Slide>
            <HandsfreeSlide />
          </Slide>
          <Slide>
            <PlaylistsSlide />
          </Slide>
          <Slide>
            <ModesSlide />
          </Slide>
          <Slide>
            <CategoriesSlide />
          </Slide>
          <Slide>
            <MediaSlide />
          </Slide>
          <Slide>
            <ManagementSlide />
          </Slide>
          <Slide>
            <CustomizationSlide />
          </Slide>
        </div>
      </div>

      <div className='grid grid-cols-[auto_1fr]'>
        {/*        <div className='flex gap-5'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>*/}

        <div className='-mr-0.5 flex flex-wrap items-center justify-end gap-x-2.5'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                'h-5 w-5 rounded-full border-4 border-accent transition-opacity disabled:opacity-50',
                index === selectedIndex
                  ? 'scale-125 border-0 bg-accent transition-all duration-200 dark:bg-[hsl(24,100%,50%)]'
                  : '',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel