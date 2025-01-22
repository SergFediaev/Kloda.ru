import { FeaturesContainer } from '@/components/carousel/featuresCarousel/featuresContainer'
import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const MediaSlide = () => {
  return (
    <FeaturesContainer>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Smart Link Handling
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Regular links are automatically converted into numbered clickable
          labels [link #1], [link #2], making them easy to identify, use and
          share.
        </li>
        <li>
          Flashcards remain clean and tidy, while the full URL path is preserved
          for easy access.
        </li>
        <li>
          Customize settings to choose how links and media are displayed should
          you find them distracting at any time.
        </li>
      </List>
    </FeaturesContainer>
  )
}