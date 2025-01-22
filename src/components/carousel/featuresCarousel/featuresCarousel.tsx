'use client'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '@/components/carousel/featuresCarousel/carouselArrowButtons'
import {
  DotButton,
  useDotButton,
} from '@/components/carousel/featuresCarousel/carouselDotButton'

import {
  CategoriesSlide,
  CustomizationSlide,
  HandsfreeSlide,
  ManagementSlide,
  MediaSlide,
  ModesSlide,
  PlaylistsSlide,
} from '@/components/carousel/featuresCarousel/featureSlides'
import { FeaturesSlide } from '@/components/carousel/featuresCarousel/featuresSlide'
import { cn } from '@/utils/mergeClasses'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import type React from 'react'
import { useCallback } from 'react'

type PropType = {
  slides?: number[]
  options?: EmblaOptionsType
}

const FeaturesCarousel = ({ options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options /*[Autoplay()]*/)

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
      <div ref={emblaRef} className='overflow-hidden'>
        <div className='flex touch-pan-y touch-pinch-zoom items-end'>
          <FeaturesSlide>
            <HandsfreeSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <PlaylistsSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <ModesSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <CategoriesSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <MediaSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <ManagementSlide />
          </FeaturesSlide>
          <FeaturesSlide>
            <CustomizationSlide />
          </FeaturesSlide>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-3 px-20 pt-5 md:grid-cols-[auto_1fr]'>
        <div className='flex justify-center gap-5 md:justify-start'>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className='-mr-0.5 flex flex-wrap items-center justify-center gap-x-2.5 md:justify-end'>
          {scrollSnaps.map((_, index) => {
            const dotIndex = index
            return (
              <DotButton
                key={dotIndex}
                onClick={() => onDotButtonClick(dotIndex)}
                className={cn(
                  'h-5 w-5 flex-none rounded-full border-4 border-accent transition-opacity disabled:opacity-50',
                  dotIndex === selectedIndex
                    ? 'scale-125 border-0 bg-accent transition-all duration-200 dark:bg-[hsl(24,100%,50%)]'
                    : '',
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesCarousel