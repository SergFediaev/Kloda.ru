import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const CategoriesSlide = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Dynamic Categories
      </Heading>
      <List hasIndent hasDisc>
        <li>
          New categories are created automatically when adding cards, and unused
          categories are removed when their last card is deleted.
        </li>
        <li>
          Categories are editable at any time whenever you wish to reorganize or
          restructure your deck.
        </li>
        <li>
          All changes take immediate effect, updating all related flashcards,
          search results, selectors, lists, collections and the randomizer.
        </li>
      </List>
    </div>
  )
}