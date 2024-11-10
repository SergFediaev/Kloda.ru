'use client'

import { Wrapper } from '@/components/containers/wrapper'
import { useScreensaver } from '@/hooks/useScreensaver'
import { secondsToMs } from '@/utils/secondsToMs'
import { Spade } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Screensaver = () => {
  const { isEnabled, secondsToActivate } = useScreensaver()
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const startTimer = () =>
      setTimeout(() => setIsDisabled(false), secondsToMs(secondsToActivate))

    let timer = startTimer()

    const onActivity = () => {
      clearTimeout(timer)
      setIsDisabled(true)
      timer = startTimer()
    }

    addEventListener('mousemove', onActivity)
    addEventListener('click', onActivity)

    return () => {
      clearTimeout(timer)
      removeEventListener('mousemove', onActivity)
      removeEventListener('click', onActivity)
    }
  }, [isEnabled, secondsToActivate])

  if (isDisabled) {
    return null
  }

  return (
    <div className='fixed inset-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm'>
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
