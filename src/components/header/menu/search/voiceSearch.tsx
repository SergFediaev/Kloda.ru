'use client'
import { Button } from '@/components/buttons/button'
import { useVoice } from '@/hooks/useVoice'
import { AudioLines, Mic } from 'lucide-react'
import { useEffect } from 'react'

type Props = {
  setSearch: (search: string) => void
}

export const VoiceSearch = ({ setSearch }: Props) => {
  const { isListening, onListen, transcript, isVoiceSupported } = useVoice()

  useEffect(() => {
    if (transcript) {
      setSearch(transcript)
    }
  }, [setSearch, transcript])

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