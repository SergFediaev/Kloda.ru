import FeaturesCarousel from '@/components/carousel/featuresCarousel/featuresCarousel'
import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import type { EmblaOptionsType } from 'embla-carousel'
import React from 'react'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export function FeaturesSection() {
  return (
    <Section className='flex items-start justify-start pt-0'>
      <Container className='pt-0'>
        <FeaturesCarousel slides={SLIDES} options={OPTIONS} />
      </Container>
    </Section>
  )
}
