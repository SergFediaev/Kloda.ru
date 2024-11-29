'use client'

import { generalSettingsStore } from '@/stores/generalSettingsStore'

export const EasterEgg = () =>
  generalSettingsStore().isEasterEggEnabled ? (
    <div className='overflow-hidden'>
      <div className='hover:paused flex animate-marquee-left items-end justify-end leading-none'>
        <span className='transition hover:scale-x-[-1]'>🐈</span>🦔
        <span className='text-xs leading-inherit'>🦔🦔🦔</span>
      </div>
    </div>
  ) : null
