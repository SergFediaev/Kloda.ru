import { Container } from '@/components/containers/container'
import { Aside } from '@/components/landing/aside'
import { Section } from '@/components/landing/section'
import { Subheading } from '@/components/landing/subheading'
import { Bike, HeartHandshake, Rocket, Trophy } from 'lucide-react'

export const CoreFeatures = () => {
  return (
    <Section className='bg-surface dark:bg-surface-dark'>
      <Container className='flex flex-wrap justify-around gap-10'>
        <Aside>
          <Subheading>
            <Trophy absoluteStrokeWidth size={72} strokeWidth={6} />
            <h3 className='font-bold text-3xl'>Efficient</h3>
          </Subheading>
          <p>
            Maximize the versatility of study methods and media support. Benefit
            from the experience of others or craft your own path to success.
            Utilize custom audio playlists, study timer, randomizer and quiz
            wheel.
          </p>
        </Aside>
        <Aside>
          <Subheading>
            <Rocket absoluteStrokeWidth size={72} strokeWidth={6} />
            <h3 className='font-bold text-3xl'>Interactive</h3>
          </Subheading>
          <p>
            Flexible randomizer will keep you alert and engaged. Full content or
            just a tease for review. Enjoy the ease of embedding audio and video
            players with a single paste. Include charts, tables, or code
            snippets.
          </p>
        </Aside>
        <Aside>
          <Subheading>
            <HeartHandshake size={72} />
            <h3 className='font-bold text-3xl'>Social</h3>
          </Subheading>
          <p>
            Keep yourself accountable by sharing your progress and achievements.
            Invite study-budies via links to cards and curated collections.
            Like, dislike, and favorite flashcards to tailor your study lists.
          </p>
          <div />
        </Aside>
        <Aside>
          <Subheading>
            <Bike absoluteStrokeWidth size={72} strokeWidth={6} />
            <h3 className='font-bold text-3xl'>Hands-free</h3>
          </Subheading>
          <p>
            Learn by listening while exercising, commuting, walking, or doing
            household chores—making Kloda the perfect companion for a busy
            lifestyle. Engage your other senses and enhance memory retention
            awith audio.
          </p>
        </Aside>
      </Container>
    </Section>
  )
}
