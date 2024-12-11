import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { List } from '@/components/containers/list'
import { OrderedList } from '@/components/containers/orderedList'
import { Heading } from '@/components/heading'
import { Link } from 'next-view-transitions'

// ToDo: Refactor manual link to usePaths.
export default function HomePage() {
  return (
    <Container isCentered>
      <Block
        heading='Kloda: Your Ultimate Flashcard Learning Tool'
        className='max-w-2xl'
      >
        <p>
          Kloda is an open-source web application designed to help you study
          smarter. Whether you're preparing for interviews, exams, or just
          mastering new skills, with these powerful features Kloda makes
          learning easy and efficient, interactive and social:
        </p>
        <OrderedList hasIndent hasGaps>
          <li>
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
                &nbsp;feature is a game-changer. It is developed, fully tested
                and built-in for any user who prefers learning by ear.
              </li>
              <li>
                Engage your other senses and enhance memory retention as all
                flashcards are easily transformed into audio, enabling you to
                study hands-free, anytime, anywhere.
              </li>
              <li>
                Search field is also tuned to built-in voice recognition, a
                useful feature if you are studying on the go. Search results go
                automatically to a dynamically labeled playlist.
              </li>
              <li>
                Playlists are generated on-the-fly based on the current set of
                cards, including applied filters and sorting options, or even
                current search results! Just choose a card, start the player and
                expand the list.
              </li>
              <li>
                TTS player keeps every active audio clearly outlined and linked
                to related flashcards if you decide to check-up graphics
                alongside audio.
              </li>
              <li>
                Or you can give TTS a supporting role by starting from a single
                card view-mode and collapsing the player.
              </li>
              <li>
                Make Kloda TTS your fun study buddy or wiser mentor by
                customizing the accent, voice, pitch, and speed of your
                text-to-speech player.
              </li>
            </List>
          </li>
          <li>
            <Heading as='h3' isSemiBold>
              Learn and Practice Modes
            </Heading>
            <List hasIndent hasDisc>
              <li>
                Learn and build knowledge at your own pace by reviewing the full
                content of a flashcard.
              </li>
              <li>
                Challenge yourself by answering questions before revealing the
                hidden content in practice mode.
              </li>
              <li>
                Brush up and test yourself with the flexible randomizer that
                will keep you alert and engaged.
              </li>
              <li>
                Seamlessly dive in the categories where you are lacking
                confidence.
              </li>
            </List>
          </li>
          <li>
            <Heading as='h3' isSemiBold>
              Seamless Flashcard Management
            </Heading>
            <List hasIndent hasDisc>
              <li>Create, edit, and delete flashcards as a registered user.</li>
              <li>
                Choose to focus on your personalized content or explore
                flashcards created by others.
              </li>
              <li>
                Like, dislike, and favorite flashcards to tailor your study
                lists.
              </li>
              <li>
                Make your study efforts social by sharing links to specific
                flashcards or curated collections.
              </li>
            </List>
          </li>
          <li>
            <Heading as='h3' isSemiBold>
              Dynamic Categories
            </Heading>
            <List hasIndent hasDisc>
              <li>
                New categories are created automatically when adding cards, and
                unused categories are removed when their last card is deleted.
              </li>
              <li>
                Categories are editable at any time whenever you wish to
                reorganize or restructure your deck.
              </li>
              <li>
                All changes take immediate effect, updating all related
                flashcards, search results, selectors, lists, collections and
                the randomizer.
              </li>
            </List>
          </li>
          <li>
            <Heading as='h3' isSemiBold>
              Media-Rich User Content
            </Heading>
            <List hasIndent hasDisc>
              <li>
                Transform your flashcards from simple text into fully
                interactive learning tools with any media — effortlessly, with
                just a single link submission.
              </li>
              <li>
                Enjoy the ease of embedding audio and video players with a
                single paste.
              </li>
              <li>
                Include charts, tables, or code snippets to make your cards more
                comprehensive.
              </li>
              <li>
                Images are automatically displayed as clickable, interactive
                elements.
              </li>
            </List>
          </li>
          <li>
            <Heading as='h3' isSemiBold>
              Smart Link Handling
            </Heading>
            <List hasIndent hasDisc>
              <li>
                Regular links are automatically converted into numbered
                clickable labels [link #1], [link #2], making them easy to
                identify, use and share.
              </li>
              <li>
                Flashcards remain clean and tidy, while the full URL path is
                preserved for easy access.
              </li>
              <li>
                Customize settings to choose how links and media are displayed
                should you find them distracting at any time.
              </li>
            </List>
          </li>
          <li>
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
              <li>
                Reset of current selections is as easy as a click of a button.
              </li>
              <li>
                With a simple settings adjustment you can collapse down display
                of embedded media in dashboard mode.
              </li>
              <li>
                Detailed view lets you zoom-in on a flashcard and easily move
                between the previous and the next — or roll the dice with the
                built-in randomizer.
              </li>
              <li>
                All cards are titled and automatically numbered which proves
                especially useful when following along playlist position.
              </li>
              <li>
                Critical actions, such as deleting items, are highlighted by
                color and trigger confirmation dialogs to provide safe delete
                options and prevent accidental data loss.
              </li>
              <li>
                Full-on <Link href='/manual'>user manual</Link> is readily
                available.
              </li>
            </List>
          </li>
        </OrderedList>
      </Block>
    </Container>
  )
}
