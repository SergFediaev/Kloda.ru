import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const PlaylistsSlide = () => {
  return (
    <Container className='flex flex-col gap-5 p-x-20 text-large text-stone-700 dark:text-stone-400'>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Dynamic Playlists
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          The search field is equipped with voice recognition, letting you find
          what you need hands-free. Dynamic playlists compile all your search
          results automatically, so you can continue learning whatever the
          surroundings — just pop on your headphones.
        </li>
        <li>
          Effortlessly switch between playlists by adjusting your search,
          current set of cards, applied filters or sorting options. Learning has
          never been so seamless!
        </li>
        <li>
          All cards are titled and automatically numbered which proves
          especially useful when following along playlist position.
        </li>
        <li>
          Share your progress by sharing your playlists. Invitation to
          collaboration has never been easier. More users mean more cards and
          even better playlists.
        </li>
      </List>
    </Container>
  )
}
