import { AccentText } from '@/components/containers/accentText'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { ErrorMessage } from '@/components/errorMessage'
import { Loader } from '@/components/loader'
import { Uptime } from '@/components/settings/uptime'
import { useGetStats } from '@/hooks/useStats'
import { ChartNoAxesColumn } from 'lucide-react'

export const Stats = () => {
  const { data, isPending, isError, error } = useGetStats()

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
      <Uptime />
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
