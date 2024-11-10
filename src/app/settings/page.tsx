import { Container } from '@/components/containers/container'
import { Settings } from '@/components/settings/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <Container>
      <Settings />
    </Container>
  )
}
