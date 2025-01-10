import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import React from 'react'

export const Handsfree = () => {
  return (
    <div>
      <Heading as='h3' isSemiBold>
        Text-to-Speech with Dynamic Playlists
      </Heading>
      <p>
        Learn by listening while exercising, commuting, walking, or doing
        household chores—making Kloda the perfect companion for a busy
        lifestyle.
      </p>
      <List hasIndent hasDisc>
        <li>
          <strong className='font-medium'>Text-to-Speech (TTS)</strong>
          &nbsp;feature is a game-changer. It is developed, fully tested and
          built-in for any user who prefers learning by ear.
        </li>
        <li>
          Engage your other senses and enhance memory retention as all
          flashcards are easily transformed into audio, enabling you to study
          hands-free, anytime, anywhere.
        </li>
        <li>
          Search field is also tuned to built-in voice recognition, a useful
          feature if you are studying on the go. Search results go automatically
          to a dynamically labeled playlist.
        </li>
        <li>
          Playlists are generated on-the-fly based on the current set of cards,
          including applied filters and sorting options, or even current search
          results! Just choose a card, start the player and expand the list.
        </li>
        <li>
          TTS player keeps every active audio clearly outlined and linked to
          related flashcards if you decide to check-up graphics alongside audio.
        </li>
        <li>
          Or you can give TTS a supporting role by starting from a single card
          view-mode and collapsing the player.
        </li>
        <li>
          Make Kloda TTS your fun study buddy or wiser mentor by customizing the
          accent, voice, pitch, and speed of your text-to-speech player.
        </li>
      </List>
    </div>
  )
}