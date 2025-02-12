import { LoginBlock } from '@/app/login/loginBlock'
import type { Metadata } from 'next'

const title = 'Login'

export const metadata: Metadata = {
  title,
}

export default function LoginPage() {
  return <LoginBlock title={title} />
}
