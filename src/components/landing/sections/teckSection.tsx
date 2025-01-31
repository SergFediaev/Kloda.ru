'use client'

import { TechCarousel } from '@/components/carousel/techstackCarousel/techCarousel'
import { Section } from '@/components/landing/section'
import { Tooltip } from '@/components/tooltip'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
}

export const TechSection = () => {
  return (
    <Section className='bg-surface p-5 text-surface-dark dark:bg-surface-dark dark:text-surface'>
      <Tooltip
        anchorId='tech-anchor'
        content='Our trusted tech stack!'
        float
        offset={30}
      >
        <TechCarousel options={OPTIONS} />
      </Tooltip>
    </Section>
  )
}
