import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const ManagementSlide = () => {
  return (
    <Container className='flex flex-col gap-5 p-x-20 text-large text-stone-700 dark:text-stone-400'>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Flashcards Management
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>Create, edit, and delete flashcards as a registered user.</li>
        <li>
          Choose to focus on your personalized content or explore flashcards
          created by others.
        </li>
        <li>
          Like, dislike, and favorite flashcards to tailor your study lists.
        </li>
        <li>
          Make your study efforts social by sharing links to specific flashcards
          or curated collections.
        </li>
      </List>
    </Container>
  )
}