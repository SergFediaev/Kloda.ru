'use client'

import { generalSettingsStore } from '@/stores/generalSettingsStore'
import { Noto_Color_Emoji } from 'next/font/google'

const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  display: 'swap',
  weight: '400',
})

export const EasterEgg = () =>
  generalSettingsStore().isEasterEggEnabled ? (
    <div className='overflow-hidden'>
      <div
        className={`hover:paused flex animate-marquee-left items-end justify-end leading-none antialiased ${noto.className}`}
      >
        <span className='transition hover:scale-x-[-1]'>🐈</span>🦔
        <span className='text-xs leading-inherit'>🦔🦔🦔🐤🐤🐤🐤🐤</span>
      </div>
    </div>
  ) : null
