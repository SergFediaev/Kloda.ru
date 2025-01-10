import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React, { type ComponentPropsWithoutRef } from 'react'

export const Modes = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Learn and Practice Modes
      </Heading>
      <List hasIndent hasDisc>
        <li>
          Learn and build knowledge at your own pace by reviewing the full
          content of a flashcard.
        </li>
        <li>
          Challenge yourself by answering questions before revealing the hidden
          content in practice mode.
        </li>
        <li>
          Brush up and test yourself with the flexible randomizer that will keep
          you alert and engaged.
        </li>
        <li>
          Seamlessly dive in the categories where you are lacking confidence.
        </li>
      </List>
    </div>
  )
}
