'use client'

import { usePaths } from '@/hooks/usePaths'
import { generalSettingsStore } from '@/stores/generalSettingsStore'
import { Noto_Color_Emoji } from 'next/font/google'

const noto = Noto_Color_Emoji({
  subsets: ['emoji'],
  display: 'swap',
  weight: '400',
})

export const EasterEgg = () => {
  const { isHomePath } = usePaths()
  const showEasterEgg = !isHomePath && generalSettingsStore().isEasterEggEnabled

  return showEasterEgg ? (
    <div className='overflow-hidden'>
      <div
        title='Easter egg can be disabled in settings'
        className={`${noto.className} hover:paused flex animate-marquee-left items-end justify-end leading-none`}
      >
        <span className='transition hover:scale-x-[-1]'>🐈</span>🦔
        <span className='text-xs leading-inherit'>🦔🦔🦔🐤🐤🐤🐤🐤</span>
      </div>
    </div>
  ) : null
}