import { Button } from '@/components/buttons/button'
import { AudioLines, Mic } from 'lucide-react'

type Props = {
  isVoiceSupported: boolean
  onListen: () => void
  isListening: boolean
}

export const VoiceSearch = ({
  isVoiceSupported,
  onListen,
  isListening,
}: Props) => {
  const voiceSearchTitle = isVoiceSupported
    ? isListening
      ? 'Stop voice search'
      : 'Start voice search'
    : 'Your browser does not support voice search'

  const voiceSearchIcon = isListening ? (
    <AudioLines className='animate-pulse' />
  ) : (
    <Mic />
  )

  return (
    <Button
      variant='text'
      onClick={onListen}
      title={voiceSearchTitle}
      disabled={!isVoiceSupported}
    >
      {voiceSearchIcon}
    </Button>
  )
}
