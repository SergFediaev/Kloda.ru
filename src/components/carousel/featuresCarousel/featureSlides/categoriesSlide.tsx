import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const CategoriesSlide = () => {
  return (
    <Container className='flex flex-col gap-5 p-x-20 text-large text-stone-700 dark:text-stone-400'>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Creating flashcards
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          The process of creating flashcards is inherently a powerful learning
          experience. By organizing ideas, crafting concise prompts, and
          integrating visuals like charts or videos, you engage deeply with the
          material, turning passive input into active retention.
        </li>
        <li>
          Categories are generated dynamically—simply assign relevant tags while
          creating a card. These tags and categories remain fully editable,
          searchable and visible at all times allowing you to reorganize and
          refine your set with ease as your needs evolve.
        </li>
        <li>
          Every change you make is reflected{' '}
          <strong className='font-semibold'>instantly</strong>, seamlessly
          updating all associated flashcards, search results, selectors, lists,
          collections, and even the randomizer, ensuring a fluid and responsive
          learning environment.
        </li>
      </List>
    </Container>
  )
}
