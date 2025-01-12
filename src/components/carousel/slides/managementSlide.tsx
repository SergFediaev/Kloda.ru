import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React, { type ComponentPropsWithoutRef } from 'react'

export const ManagementSlide = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Seamless Flashcard Management
      </Heading>
      <List hasIndent hasDisc>
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
    </div>
  )
}