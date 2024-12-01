'use client'

import { Columns } from '@/components/containers/columns'
import { AppInfo } from '@/components/settings/appInfo'
import { CardsSettings } from '@/components/settings/cardsSettings'
import { DebugModeSettings } from '@/components/settings/debugModeSettings'
import { GeneralSettings } from '@/components/settings/generalSettings'
import { ResetSettings } from '@/components/settings/resetSettings'
import { ScreensaverSettings } from '@/components/settings/screensaverSettings'
import { Stats } from '@/components/settings/stats'
import { generalSettingsStore } from '@/stores/generalSettingsStore'

export const Settings = () => (
  <Columns count={'3'}>
    <GeneralSettings />
    {generalSettingsStore().isDebugModeEnabled && <DebugModeSettings />}
    <CardsSettings />
    <ScreensaverSettings />
    <ResetSettings />
    <Stats />
    <AppInfo />
  </Columns>
)
