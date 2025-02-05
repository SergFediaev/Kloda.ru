import { Button } from '@/components/buttons/button'
import { Container } from '@/components/containers/container'
import { Section } from '@/components/landing/section'
import { Link } from 'next-view-transitions'

export const PresentationSection = () => {
  return (
    <Section className='bg-accent text-4xl text-primary-dark selection:bg-black dark:bg-accent'>
      <Container className='flex flex-col items-center gap-5'>
        <h1 className='font-extrabold text-6xl'>Kloda</h1>
        <p className='text-center'>A powerful tool to help you study smarter</p>
        <Button
          className='mt-3 border-none bg-white font-bold text-accent text-base uppercase transition hover:bg-opacity-90 hover:text-accent'
          variant='outline'
          as={Link}
          href='/cards'
        >
          Get started
        </Button>
      </Container>
    </Section>
  )
}
