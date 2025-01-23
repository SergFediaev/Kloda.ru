import { Container } from '@/components/containers/container'
import { Article } from '@/components/landing/article'
import { Section } from '@/components/landing/section'
import { Subheading } from '@/components/landing/subheading'
import { Bike, HeartHandshake, Rocket, Trophy } from 'lucide-react'

export const CoreFeaturesSection = () => {
  return (
    <Section className='bg-surface dark:bg-surface-dark'>
      <Container className='flex flex-wrap justify-around gap-10'>
        <Article>
          <Subheading>
            <Trophy absoluteStrokeWidth size={72} strokeWidth={6} />
            <h2 className='font-bold text-3xl'>Efficient</h2>
          </Subheading>
          <p>
            Maximize the versatility of study methods and media support. Benefit
            from the experience of others or craft your own path to success.
            Utilize custom audio playlists, randomizer, study-timer and quizz.
          </p>
        </Article>
        <Article>
          <Subheading>
            <Rocket absoluteStrokeWidth size={72} strokeWidth={6} />
            <h2 className='font-bold text-3xl'>Interactive</h2>
          </Subheading>
          <p>
            Flexible randomizer will keep you alert and engaged. Full content or
            just a tease for review. Enjoy the ease of embedding audio and video
            players with a single paste. Include charts, tables, or code
            snippets.
          </p>
        </Article>
        <Article>
          <Subheading>
            <HeartHandshake size={72} />
            <h2 className='font-bold text-3xl'>Social</h2>
          </Subheading>
          <p>
            Keep yourself accountable by sharing your progress and achievements.
            Invite study-buddies via links to cards and curated collections.
            Like, dislike, and favorite flashcards to tailor your study lists.
          </p>
          <div />
        </Article>
        <Article>
          <Subheading>
            <Bike absoluteStrokeWidth size={72} strokeWidth={6} />
            <h2 className='font-bold text-3xl'>Hands-free</h2>
          </Subheading>
          <p>
            Learn by listening while exercising, commuting, walking, or doing
            household chores—making Kloda the perfect companion for a busy
            lifestyle. Engage your other senses and enhance memory retention
            with audio.
          </p>
        </Article>
      </Container>
    </Section>
  )
}
