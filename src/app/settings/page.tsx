import { Columns } from '@/components/containers/columns'
import { Container } from '@/components/containers/container'
import { ScreensaverSetting } from '@/components/settings/screensaverSetting'
import { UptimeSetting } from '@/components/settings/uptimeSetting'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsPage() {
  return (
    <Container>
      <Columns count={'2'}>
        <ScreensaverSetting />
        <UptimeSetting />
      </Columns>
    </Container>
  )
}
