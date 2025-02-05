import { Button } from '@/components/buttons/button'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { Copy } from 'lucide-react'

type Props = {
  title: string
  content: string
  theme?: string
}

export const CopyCard = ({ content, theme, title }: Props) => {
  const copyCardContent = () =>
    copyToClipboard(
      `${title}\n\n${content}`,
      'Card content copied to clipboard',
      theme,
    )
  return (
    <Button
      variant='text'
      onClick={copyCardContent}
      title='Copy card content to clipboard'
    >
      <Copy />
    </Button>
  )
}