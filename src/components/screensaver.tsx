'use client'

import { Wrapper } from '@/components/containers/wrapper'
import {
  addActivityListeners,
  removeActivityListeners,
} from '@/hooks/useActivity'
import { screensaverStore } from '@/stores/screensaverStore'
import { minutesToMs } from '@/utils/minutesToMs'
import { Spade } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Screensaver = () => {
  const { isEnabled, minutesToActivate } = screensaverStore()
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const startTimer = () =>
      setTimeout(() => setIsDisabled(false), minutesToMs(minutesToActivate))

    let timer = startTimer()

    const onActivity = () => {
      clearTimeout(timer)
      setIsDisabled(true)
      timer = startTimer()
    }

    addActivityListeners(onActivity)

    return () => {
      clearTimeout(timer)
      removeActivityListeners(onActivity)
    }
  }, [isEnabled, minutesToActivate])

  if (isDisabled) {
    return null
  }

  return (
    <div className='fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm'>
      <aside className='absolute bottom-0 m-6 text-white opacity-50'>
        <p>Screensaver</p>
        <p>Any action will turn it off</p>
        <p>You can disable it in settings</p>
      </aside>
      <div className='bounce-horizontal'>
        <Wrapper className='bounce-vertical h-[50px] w-[150px] justify-center font-black text-3xl text-accent'>
          Kloda&nbsp;
          <Spade className='fill-accent' />
        </Wrapper>
      </div>
    </div>
  )
}
