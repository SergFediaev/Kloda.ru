import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const ModesSlide = () => {
  return (
    <Container className='flex flex-col gap-5 p-x-20 text-large text-stone-700 dark:text-stone-400'>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Learn and Practice
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Master new material at your own pace by fully exploring the content of
          each flashcard, allowing for a deeper understanding and solidifying
          your knowledge.
        </li>
        <li>
          Push your boundaries by testing your recall before revealing the
          hidden content in practice mode—perfect for building confidence and
          reinforcing memory.
        </li>
        <li>
          Keep your mind sharp with the flexible randomizer, designed to keep
          you engaged by introducing variety and ensuring you remain challenged
          at all times.
        </li>
        <li>
          Effortlessly dive in the categories where you need improvement, honing
          in on areas of weakness to maximize your learning efficiency and boost
          confidence.
        </li>
      </List>
    </Container>
  )
}
