import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import { Summary } from '@/components/landing/summary'

export const StatementSection = () => {
  return (
    <Section className='pb-0 dark:selection:bg-white'>
      <Container className='gap-5'>
        <h2 className='text-center font-extrabold text-4xl text-accent-variant dark:text-accent-neon'>
          Be proud of the better you for studying smarter ...and faster.
        </h2>
        <Summary />
      </Container>
    </Section>
  )
}
