'use client'

import { useGeneralSettings } from '@/hooks/useGeneralSettings'

export const EasterEgg = () =>
  useGeneralSettings().isEasterEggEnabled ? (
    <div className='overflow-hidden'>
      <div className='hover:paused flex animate-marquee-left items-end justify-end leading-none'>
        <span className='transition hover:scale-x-[-1]'>🐈</span>🦔
        <span className='text-xs leading-inherit'>🦔🦔🦔</span>
      </div>
    </div>
  ) : null
