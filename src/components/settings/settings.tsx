'use client'

import { Columns } from '@/components/containers/columns'
import { AppInfo } from '@/components/settings/appInfo'
import { CardsSettings } from '@/components/settings/cardsSettings'
import { DebugModeSettings } from '@/components/settings/debugModeSettings'
import { GeneralSettings } from '@/components/settings/generalSettings'
import { ResetSettings } from '@/components/settings/resetSettings'
import { ScreensaverSettings } from '@/components/settings/screensaverSettings'
import { UptimeSettings } from '@/components/settings/uptimeSettings'
import { useGeneralSettings } from '@/hooks/useGeneralSettings'

export const Settings = () => (
  <Columns count={'3'}>
    <GeneralSettings />
    {useGeneralSettings().isDebugModeEnabled && <DebugModeSettings />}
    <CardsSettings />
    <ScreensaverSettings />
    <ResetSettings />
    <UptimeSettings />
    <AppInfo />
  </Columns>
)
