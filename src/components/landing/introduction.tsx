import { Button } from '@/components/buttons/button'
import { Text } from '@/components/containers/text'
import { Heading } from '@/components/heading'
import { Link } from 'next-view-transitions'
import * as React from 'react'

export const Introduction = () => {
  return (
    <section className='flex min-h-1/3 w-full flex-col items-center justify-center gap-7 bg-accent-variant p-24 align-middle text-white shadow-md backdrop-blur-2xl selection:bg-black'>
      <Heading as='h1' className='font-black text-6xl'>
        <Text isCapitalize>Kloda</Text>
      </Heading>
      <div className='text-4xl text-white'>
        A powerful tool to help you study smarter
      </div>
      <Button
        className='border-3 text-2xl'
        type={'button'}
        variant='outline'
        as={Link}
        href='/cards'
      >
        Get started
      </Button>
    </section>
  )
}