import { FeaturesContainer } from '@/components/carousel'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'

export const HandsfreeSlide = () => {
  return (
    <FeaturesContainer>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        Hands-Free
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Our <strong className='font-medium'>signature</strong> feature is a
          game-changer. It is designed for everyone who wants to boost their
          memory retention through audio cues.
        </li>
        <li>
          Engage your other senses as all flashcards are easily transformed into
          audio, enabling you to study hands-free, anytime, anywhere.
        </li>
        <li>
          The <strong className='font-medium'>Hands-Free</strong> player keeps
          every active audio clearly outlined and linked to related flashcards
          if you decide to check-up graphics alongside audio.
        </li>
        <li>
          Make Kloda your fun study buddy or wiser mentor by customizing the
          accent, voice, pitch, and speed of your{' '}
          <strong className='font-medium'>Hands-Free</strong> player.
        </li>
      </List>
    </FeaturesContainer>
  )
}
