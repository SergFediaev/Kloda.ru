import { CategoriesSlide } from '@/components/carousel/slides/categoriesSlide'
import { CustomizationSlide } from '@/components/carousel/slides/customizationSlide'
import { HandsfreeSlide } from '@/components/carousel/slides/handsfreeSlide'
import { ManagementSlide } from '@/components/carousel/slides/managementSlide'
import { MediaSlide } from '@/components/carousel/slides/mediaSlide'
import { ModesSlide } from '@/components/carousel/slides/modesSlide'
import { CarouselSlide } from '@/components/carousel/ui/carouselSlide'
import type React from 'react'

export const CarouselSlidesSet = () => {
  return (
    <>
      <CarouselSlide>
        <HandsfreeSlide />
      </CarouselSlide>
      <CarouselSlide>
        <ModesSlide />
      </CarouselSlide>
      <CarouselSlide>
        <ManagementSlide />
      </CarouselSlide>
      <CarouselSlide>
        <MediaSlide />
      </CarouselSlide>
      <CarouselSlide>
        <CategoriesSlide />
      </CarouselSlide>
      <CarouselSlide>
        <CustomizationSlide />
      </CarouselSlide>
    </>
  )
}