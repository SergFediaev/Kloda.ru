'use client'

import { TechCarousel } from '@/components/carousel/techstackCarousel/techCarousel'
import { Section } from '@/components/landing/section'
import { Tooltippy } from '@/components/tooltip/tooltippy'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
}

export const TechSection = () => {
  return (
    <Section className='bg-surface p-5 text-surface-dark dark:bg-surface-dark dark:text-surface'>
      <Tooltippy
        anchorId='tech-anchor'
        content='Our trusted tech stack for this App!'
        float={true}
        offset={30}
      >
        <TechCarousel options={OPTIONS} />
      </Tooltippy>
    </Section>
  )
}