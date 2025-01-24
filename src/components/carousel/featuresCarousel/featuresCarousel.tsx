'use client'

import {
  CategoriesSlide,
  CustomizationSlide,
  DotButton,
  FeaturesSlide,
  HandsfreeSlide,
  ManagementSlide,
  MediaSlide,
  ModesSlide,
  NextButton,
  PlaylistsSlide,
  PrevButton,
  useDotButton,
  usePrevNextButtons,
} from '@/components/carousel'

import { cn } from '@/utils/mergeClasses'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type Props = {
  options?: EmblaOptionsType
}

export const FeaturesCarousel = ({ options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

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

      <div className='flex flex-wrap justify-evenly gap-5 py-5'>
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
                  'h-5 w-5 flex-none rounded-full border-4 border-accent transition-all duration-200 hover:border-accent-neon hover:bg-accent-neon hover:text-accent',
                  dotIndex === selectedIndex
                    ? 'scale-125 border-0 bg-accent dark:bg-accent'
                    : 'hover:scale-75',
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
