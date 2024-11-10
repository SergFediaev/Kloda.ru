'use client'

import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { Time } from '@/components/settings/time'
import { CalendarDays, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

type Uptime = {
  days: number
  time: string
}

export const UptimeSetting = () => {
  const [{ days, time }, setUptime] = useState<Uptime>({
    days: 0,
    time: '00:00:00.000',
  })

  useEffect(() => {
    const socket: WebSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}uptime`,
    )

    socket.onmessage = ({ data }) => {
      try {
        const uptime: Uptime = JSON.parse(data)
        setUptime(uptime)
      } catch (error) {
        console.error(error)
      }
    }

    return () => socket.close()
  }, [])

  return (
    <Block heading='Uptime' inColumns>
      <div>
        <p>Kloda backend uptime:</p>
        <Wrapper as='p' hasGaps className='font-mono'>
          <Time icon={CalendarDays} title='Days'>
            {days}
          </Time>
          <Time icon={Clock} title='Time'>
            {time}
          </Time>
        </Wrapper>
      </div>
    </Block>
  )
}
