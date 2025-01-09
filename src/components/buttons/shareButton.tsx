import { Button } from '@/components/buttons/button'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { LinkIcon, Share2 } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  url: string
  shareTitle: string
  copyTitle: string
  notification: string
  theme?: string
} & ComponentPropsWithoutRef<'button'>

export const ShareButton = ({
  url,
  shareTitle,
  copyTitle,
  notification,
  theme,
  ...restProps
}: Props) => {
  const isShareable = !!navigator.share
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const title = isShareable ? shareTitle : copyTitle
  const icon = isShareable ? <Share2 /> : <LinkIcon />

  const shareFallback = () => copyToClipboard(url, notification, theme)

  const share = async () => {
    if (!isShareable || (isShareable && !isMobile)) {
      return await shareFallback()
    }
    try {
      await navigator.share({
        url,
        title: url,
      })
    } catch (error) {
      console.error(error)
      await shareFallback()
    }
  }

  return (
    <Button variant='text' onClick={share} title={title} {...restProps}>
      {icon}
    </Button>
  )
}