import { Container } from '@/components/containers/container'
import { Heading } from '@/components/heading'
import { Bike, HeartHandshake, Rocket, Trophy } from 'lucide-react'
import * as React from 'react'

export const CoreFeatures = () => {
  return (
    <section className='min-h-1/4 w-full flex-wrap items-center justify-center bg-surface p-12 align-middle shadow-md backdrop-blur-xl dark:bg-surface-dark'>
      <Container className='p-0'>
        <div className='flex justify-around gap-x-8'>
          <div>
            <Trophy absoluteStrokeWidth size={72} strokeWidth={6} />
            <Heading as='h3' className='font-bold text-3xl'>
              Efficient
            </Heading>
            <div className='mt-2'>
              Maximize the versatility of study methods and media support.
              Benefit from the experience of others or craft your own path to
              success. Utilize custom audio playlists, study timer, randomizer
              and quiz wheel.
            </div>
          </div>
          <div>
            <Rocket absoluteStrokeWidth size={72} strokeWidth={6} />
            <Heading as='h3' className='font-bold text-3xl'>
              Interactive
            </Heading>
            <div className='mt-2'>
              Flexible randomizer will keep you alert and engaged. Full content
              or just a tease for review. Enjoy the ease of embedding audio and
              video players with a single paste. Include charts, tables, or code
              snippets.
            </div>
          </div>
          <div>
            <HeartHandshake size={72} />
            <Heading as='h3' className='font-bold text-3xl'>
              Social
            </Heading>
            <div className='mt-2'>
              Keep yourself accountable by sharing your progress and
              achievements. Invite study-budies via links to cards and curated
              collections. Like, dislike, and favorite flashcards to tailor your
              study lists.
            </div>
            <div />
          </div>
          <div>
            <Bike absoluteStrokeWidth size={72} strokeWidth={6} />
            <Heading as='h3' className='font-bold text-3xl'>
              Hands-free
            </Heading>
            <div className='mt-2'>
              Learn by listening while exercising, commuting, walking, or doing
              household chores—making Kloda the perfect companion for a busy
              lifestyle. Engage your other senses and enhance memory retention
              awith audio.
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
