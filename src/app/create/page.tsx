import { CardForm } from '@/components/cardForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create card',
}

export default function Create() {
  return (
    <div className='w-full flex flex-grow justify-center items-center p-8'>
      <div className='w-full max-w-xl flex flex-col gap-8 rounded-3xl p-8 shadow-lg bg-neutral-200 dark:bg-neutral-800'>
        <h2 className='text-2xl self-center'>Create card</h2>
        <CardForm />
        <span className='self-center'>
          ← <Link href='/'>Back to cards</Link>
        </span>
      </div>
    </div>
  )
}
