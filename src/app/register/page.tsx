import { RegisterBlock } from '@/app/register/registerBlock'
import type { Metadata } from 'next'

const title = 'Register'

export const metadata: Metadata = {
  title,
}

export default function RegisterPage() {
  return <RegisterBlock title={title} />
}