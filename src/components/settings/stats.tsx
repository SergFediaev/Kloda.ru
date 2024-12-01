'use client'

import { AccentText } from '@/components/containers/accentText'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { Time } from '@/components/settings/time'
import { useGetStats } from '@/hooks/useStats'
import { CalendarDays, ChartNoAxesColumn, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

type Uptime = {
  days: number
  time: string
}

export const Stats = () => {
  const { data, isPending, isError, error } = useGetStats()
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

  if (isPending) {
    return <Loader>Fetching stats</Loader>
  }

  if (isError) {
    return <ErrorMessage isError>{error.message}</ErrorMessage>
  }

  const {
    totalUsers,
    totalCards,
    totalCategories,
    totalCategorized,
    totalUncategorized,
    totalFavorite,
    totalLiked,
    totalDisliked,
  } = data

  return (
    <Block heading='Statistics' inColumns>
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
      <div>
        <Wrapper as='p'>
          <ChartNoAxesColumn size={16} />
          &nbsp;Total backend stats
        </Wrapper>
        <AccentText label='Users:'>{totalUsers}</AccentText>
        <AccentText label='Cards:'>{totalCards}</AccentText>
        <AccentText label='Card categories:'>{totalCategories}</AccentText>
        <AccentText label='Categorized cards:'>{totalCategorized}</AccentText>
        <AccentText label='Uncategorized cards:'>
          {totalUncategorized}
        </AccentText>
        <AccentText label='Favorite cards:'>{totalFavorite}</AccentText>
        <AccentText label='Liked cards:'>{totalLiked}</AccentText>
        <AccentText label='Disliked cards:'>{totalDisliked}</AccentText>
      </div>
    </Block>
  )
}
