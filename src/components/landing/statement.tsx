import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'

export const Statement = () => {
  return (
    <Section className='dark:selection:bg-white'>
      <Container>
        <h2 className='text-center font-extrabold text-4xl text-accent-variant dark:text-[hsl(24,100%,50%)]'>
          Be proud of the better you for studying smarter ...and faster.
        </h2>
      </Container>
    </Section>
  )
}