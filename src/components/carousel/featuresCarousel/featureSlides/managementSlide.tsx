import { FeaturesContainer } from '@/components/carousel'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'

export const ManagementSlide = () => {
  return (
    <FeaturesContainer>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Flashcards Management
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Detailed view lets you zoom-in on a flashcard and easily move between
          the previous and the next — or roll the dice with the built-in
          randomizer.
        </li>
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
    </FeaturesContainer>
  )
}
