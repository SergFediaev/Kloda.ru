'use client'

import { Container } from '@/components/containers/container'
import { useEffect } from 'react'

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container>
      <div className='text-danger text-xl'>Error fetching Cards data</div>
      <div>{error.message}</div>
    </Container>
  )
}