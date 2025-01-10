'use client'

import EmblaCarousel from '@/components/carousel/emblaCarousel'
import { Container } from '@/components/containers/container'

import type { EmblaOptionsType } from 'embla-carousel'
import React from 'react'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export function Carousel() {
  return (
    <Container>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </Container>
  )
}