import { FeaturesCarousel } from '@/components/carousel'
import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }

export function FeaturesSection() {
  return (
    <Section className='flex items-start justify-start pt-0'>
      <Container className='pt-0'>
        <FeaturesCarousel options={OPTIONS} />
      </Container>
    </Section>
  )
}
