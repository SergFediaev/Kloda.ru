import { TechCarousel } from '@/components/carousel/techstackCarousel/techCarousel'
import { Section } from '@/components/landing/section'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: 'start',
}

export function TechSection() {
  return (
    <Section
      className='bg-surface p-5 text-surface-dark dark:bg-surface-dark dark:text-surface'
      title='Our trusted tech stack for this app'
    >
      <TechCarousel options={OPTIONS} />
    </Section>
  )
}
