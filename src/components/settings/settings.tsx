'use client'

import { Columns } from '@/components/containers/columns'
import { DebugModeSettings } from '@/components/settings/debugModeSettings'
import { GeneralSettings } from '@/components/settings/generalSettings'
import { ScreensaverSettings } from '@/components/settings/screensaverSettings'
import { UptimeSettings } from '@/components/settings/uptimeSettings'
import { useGeneralSettings } from '@/hooks/useGeneralSettings'

export const Settings = () => (
  <Columns count={'3'}>
    <GeneralSettings />
    {useGeneralSettings().isDebugModeEnabled && <DebugModeSettings />}
    <ScreensaverSettings />
    <UptimeSettings />
  </Columns>
)
