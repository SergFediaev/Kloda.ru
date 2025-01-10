import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React, { type ComponentPropsWithoutRef } from 'react'

export const Media = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Smart Link Handling
      </Heading>
      <List hasIndent hasDisc>
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
    </div>
  )
}