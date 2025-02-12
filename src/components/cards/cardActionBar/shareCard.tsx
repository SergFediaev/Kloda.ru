import { ShareButton } from '@/components/buttons/shareButton'

type Props = {
  cardId: string
  theme?: string
}

export const ShareCard = ({ cardId, theme }: Props) => {
  return (
    <ShareButton
      url={`${window.location.origin}/card/${cardId}`}
      shareTitle='Share card link'
      copyTitle='Copy card link to clipboard'
      notification='Card link copied to clipboard'
      theme={theme}
    />
  )
}
