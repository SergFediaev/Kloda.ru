import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import { Link } from 'next-view-transitions'
import React, { type ComponentPropsWithoutRef } from 'react'

export const CustomizationSlide = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        User friendly and highly customizable
      </Heading>
      <List hasIndent hasDisc>
        <li>
          Simple, flexible design that scales seamlessly to any device or
          browser.
        </li>
        <li>
          Day and night modes with an impactful yet balanced color scheme.
        </li>
        <li>
          Navigation experience is outstanding with featured category
          multi-select, pagination and multiple sort options.
        </li>
        <li>
          Dashboard menu enables seamless change between different row
          structures.
        </li>
        <li>Reset of current selections is as easy as a click of a button.</li>
        <li>
          With a simple settings adjustment you can collapse down display of
          embedded media in dashboard mode.
        </li>
        <li>
          Detailed view lets you zoom-in on a flashcard and easily move between
          the previous and the next — or roll the dice with the built-in
          randomizer.
        </li>
        <li>
          All cards are titled and automatically numbered which proves
          especially useful when following along playlist position.
        </li>
        <li>
          Critical actions, such as deleting items, are highlighted by color and
          trigger confirmation dialogs to provide safe delete options and
          prevent accidental data loss.
        </li>
        <li>
          Full-on <Link href='/manual'>user manual</Link> is readily available.
        </li>
      </List>
    </div>
  )
}