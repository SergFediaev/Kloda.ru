import { Wrapper } from '@/components/containers/wrapper'
import { Time } from '@/components/settings/time'
import { CalendarDays, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

type Duration = {
  days: number
  time: string
}

export const Uptime = () => {
  const [{ days, time }, setDuration] = useState<Duration>({
    days: 0,
    time: '00:00:00.000',
  })

  useEffect(() => {
    const socket: WebSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}uptime`,
    )

    socket.onmessage = ({ data }) => {
      try {
        const duration: Duration = JSON.parse(data)
        setDuration(duration)
      } catch (error) {
        console.error(error)
      }
    }

    return () => socket.close()
  }, [])

  return (
    <div>
      <p>Kloda backend uptime:</p>
      <Wrapper as='p' hasGaps isMono>
        <Time icon={CalendarDays} title='Days'>
          {days}
        </Time>
        <Time icon={Clock} title='Time'>
          {time}
        </Time>
      </Wrapper>
    </div>
  )
}
