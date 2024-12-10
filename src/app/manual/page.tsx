import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { IconText } from '@/components/containers/iconText'
import { Heading } from '@/components/heading'
import {
  ArrowRightToLine,
  AudioLines,
  ChevronDown,
  ChevronUp,
  CircleChevronLeft,
  CircleChevronRight,
  CirclePause,
  CirclePlay,
  CircleStop,
  CircleUser,
  Copy,
  Dices,
  Disc3,
  Dumbbell,
  Eye,
  EyeOff,
  FilePlus,
  GraduationCap,
  LayoutDashboard,
  LinkIcon,
  ListMusic,
  ListRestart,
  LogIn,
  Menu,
  Mic,
  Moon,
  Repeat1,
  Search,
  Settings,
  Settings2,
  Share2,
  Shuffle,
  Spade,
  Speech,
  SquarePen,
  Star,
  Sun,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Undo2,
  Unplug,
  Users,
  X,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manual',
}

export default function ManualPage() {
  return (
    <Container isCentered>
      <Block heading='User manual' isHeadingCentered className='max-w-2xl'>
        <Heading as='h3'>Menu</Heading>
        <IconText icon={Spade} className='animate-heartbeat'>
          The application logo is displayed if the user's device has an internet
          connection.
        </IconText>
        <IconText icon={Unplug} className='text-danger dark:text-danger-dark'>
          Displays instead of the logo if there is no internet connection and
          the application is running offline.
        </IconText>
        <IconText icon={Search}>
          Activates the search bar. Search can also be activated using the
          hotkey combination <strong>Ctrl + K</strong>.
          <br />
          On the cards page, the search finds cards by their title and content.
          <br />
          On the users page, it searches for users by their name and email
          address.
        </IconText>
        <IconText icon={Mic}>
          Enables voice search if the user's device supports this feature.
        </IconText>
        <IconText icon={AudioLines} className='animate-pulse'>
          Appears instead of the microphone button when voice input is expected.
          Once the user voices a search query, it is automatically applied.
        </IconText>
        <IconText icon={LogIn}>
          Opens the login page. On this page, users can log in to their profile
          or access the registration form for new users.
        </IconText>
        <IconText icon={CircleUser}>
          Displays if the user is logged in and opens their profile.
        </IconText>
        <IconText icon={Users}>
          Opens the page with all users registered in the application.
        </IconText>
        <IconText icon={LayoutDashboard}>Opens the page with cards.</IconText>
        <IconText icon={FilePlus}>
          Opens the form for creating a new card. Only authorized users can
          create cards.
        </IconText>
        <IconText icon={Dumbbell}>
          Enables the card practice mode. In this mode, the content of all cards
          is hidden, and only their titles are displayed.
        </IconText>
        <IconText icon={GraduationCap}>
          Enables the card study mode. In this mode, the content of all cards is
          displayed.
        </IconText>
        <IconText icon={Moon}>
          Enables the dark theme of the application.
        </IconText>
        <IconText icon={Sun}>
          Enables the light theme of the application.
        </IconText>
        <IconText icon={Settings}>
          Opens the application settings page.
        </IconText>
        <IconText icon={ChevronUp}>Collapses the menu header.</IconText>
        <IconText icon={Menu}>
          Displays when the menu header is collapsed and expands it.
        </IconText>
        <hr />
        <Heading as='h3'>Card</Heading>
        <IconText icon={ChevronDown}>
          Expands additional card information: categories, author, creation/last
          update date and time, identifier. If additional card information is
          expanded on the cards page, it also displays the card's ordinal number
          on the current page.
        </IconText>
        <IconText icon={ChevronUp}>
          Displays when additional card information is expanded and collapses
          it.
        </IconText>
        <IconText icon={ThumbsUp}>
          Likes the card. Only authorized users can like cards. The total number
          of card likes is displayed next to it.
        </IconText>
        <IconText icon={ThumbsDown}>
          Dislikes the card. Only authorized users can dislike cards. The total
          number of card dislikes is displayed next to it.
        </IconText>
        <IconText icon={Star}>
          Adds the card to favorites. Only authorized users can add cards to
          favorites. The total number of times the card has been added to
          favorites is displayed next to it.
        </IconText>
        <IconText icon={Copy}>
          Copies the card's title and content to the clipboard.
        </IconText>
        <IconText icon={Share2}>
          Shares the card. Displays if the user's device supports the&nbsp;
          <q>Share</q> feature.
        </IconText>
        <IconText icon={LinkIcon}>
          Copies the card's link to the clipboard. Displays instead of the&nbsp;
          <q>Share</q> button if the user's device does not support this
          feature.
        </IconText>
        <IconText icon={Speech}>
          Opens the card TTS player, where you can enable text-to-speech reading
          of the card and configure its settings.
        </IconText>
        <IconText icon={EyeOff}>
          Hides the card content, leaving only its title visible.
        </IconText>
        <IconText icon={Eye}>Shows the card content if it is hidden.</IconText>
        <IconText icon={SquarePen}>
          Opens the card editing form. Only authorized users can edit cards they
          have created.
        </IconText>
        <IconText icon={Trash2} className='text-danger dark:text-danger-dark'>
          Opens a dialog to confirm the deletion of the card. Only authorized
          users can delete cards they have created.
        </IconText>
        <hr />
        <Heading as='h3'>Card Text-to-Speech (TTS)</Heading>
        <IconText icon={CircleChevronLeft}>
          Plays the TTS reading of the previous card in the playlist. If the
          current card is the first in the playlist, it plays the last one.
        </IconText>
        <IconText icon={CirclePlay}>
          Plays the TTS reading of the currently selected card.
        </IconText>
        <IconText icon={CirclePause}>
          Pauses the TTS reading of the card.
        </IconText>
        <IconText icon={CircleStop}>
          Stops the TTS reading of the card.
        </IconText>
        <IconText icon={CircleChevronRight}>
          Plays the TTS reading of the next card in the playlist. If the current
          card is the last in the playlist, it plays the first one.
        </IconText>
        <IconText icon={Dices}>
          Plays the TTS reading of a random card in the playlist.
        </IconText>
        <IconText icon={ArrowRightToLine}>
          Enables single TTS reading mode for a card.
        </IconText>
        <IconText icon={Repeat1}>
          Enables looping TTS reading mode for a single card.
        </IconText>
        <IconText icon={ListRestart}>
          Enables looping TTS reading mode for the card playlist.
        </IconText>
        <IconText icon={Shuffle}>
          Enables random card TTS reading mode from the playlist.
        </IconText>
        <IconText icon={ListMusic}>
          Expands/collapses the playlist for TTS reading.
        </IconText>
        <IconText icon={Disc3}>
          Shows/hides the visualization of the TTS reading process.
        </IconText>
        <IconText icon={Settings2}>
          Expands/collapses the TTS settings. In the settings, users can select
          a synthetic voice from the ones available on their device. Users can
          also adjust the voice volume, rate, and pitch.
        </IconText>
        <IconText icon={Undo2} className='text-danger dark:text-danger-dark'>
          Resets all TTS settings to their default values.
        </IconText>
        <IconText icon={X}>Closes the TTS player.</IconText>
      </Block>
    </Container>
  )
}
