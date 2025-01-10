import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React, { type ComponentPropsWithoutRef } from 'react'

export const Media = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Media-Rich User Content
      </Heading>
      <List hasIndent hasDisc>
        <li>
          Transform your flashcards from simple text into fully interactive
          learning tools with any media — effortlessly, with just a single link
          submission.
        </li>
        <li>
          Enjoy the ease of embedding audio and video players with a single
          paste.
        </li>
        <li>
          Include charts, tables, or code snippets to make your cards more
          comprehensive.
        </li>
        <li>
          Images are automatically displayed as clickable, interactive elements.
        </li>
      </List>
    </div>
  )
}