import type { Nullable } from '@/types/nullable'
import { useEffect, useState } from 'react'

let speechRecognition: Nullable<SpeechRecognition> = null

if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
  speechRecognition = new webkitSpeechRecognition()
  speechRecognition.lang = 'ru-RU' // ToDo: Set lang
}

export const useVoice = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState<string>()
  const isVoiceSupported = speechRecognition !== null

  const onListen = () => {
    if (!speechRecognition) {
      return
    }

    if (isListening) {
      speechRecognition.stop()
      setIsListening(false)
    } else {
      speechRecognition.start()
      setIsListening(true)
    }
  }

  useEffect(() => {
    if (!speechRecognition) {
      return
    }

    speechRecognition.onresult = ({ results }) => {
      setTranscript(results[results.length - 1][0].transcript)
      setIsListening(false)
      speechRecognition.stop()
    }

    speechRecognition.onend = () => setIsListening(false)

    return () => {
      speechRecognition.stop()
      speechRecognition.onresult = null
      speechRecognition.onend = null
    }
  }, [])

  return {
    isListening,
    onListen,
    transcript,
    isVoiceSupported,
  }
}
