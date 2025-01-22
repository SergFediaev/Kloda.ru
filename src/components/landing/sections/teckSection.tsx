import TechCarousel from '@/components/carousel/techstackCarousel/techCarousel'
import { Section } from '@/components/landing/section'
import type { EmblaOptionsType } from 'embla-carousel'
import React from 'react'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
}

export function TechSection() {
  return (
    <Section
      className='bg-surface text-surface-dark dark:bg-surface-dark dark:text-surface'
      title='Our trusted tech stack for this app'
    >
      <TechCarousel options={OPTIONS} />
    </Section>
  )
}