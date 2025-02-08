'use client'

import { Button } from '@/components/buttons/button'
import { Wrapper } from '@/components/containers/wrapper'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ReturnToCards = () => {
  const router = useRouter()

  return (
    <Wrapper className='gap-1 self-center'>
      <ArrowLeft size={16} />
      <Button variant='text' onClick={() => router.back()}>
        Go back
      </Button>
    </Wrapper>
  )
}