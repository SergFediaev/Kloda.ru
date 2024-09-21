import { CardForm } from '@/components/cardForm'
import { CenteredContainer } from '@/components/centeredContainer'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create card',
}

export default function Create() {
  return (
    <CenteredContainer>
      <div className='flex w-full max-w-xl flex-col gap-8 rounded-3xl bg-neutral-200 p-8 shadow-lg dark:bg-neutral-800'>
        <h2 className='self-center text-2xl'>Create card</h2>
        <CardForm />
        <span className='self-center'>
          ← <Link href='/'>Back to cards</Link>
        </span>
      </div>
    </CenteredContainer>
  )
}
