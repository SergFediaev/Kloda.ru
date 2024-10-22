import type { CardResponse } from '@/api/cards/cards.types'
import { Button } from '@/components/button'
import { Wrapper } from '@/components/containers/wrapper'
import { Heading } from '@/components/heading'
import type { Nullable } from '@/types/nullable'
import { cn } from '@/utils/mergeClasses'
import { Select, SelectItem } from '@nextui-org/select'
import { Slider } from '@nextui-org/slider'
import {
  ArrowRightToLine,
  CircleChevronLeft,
  CircleChevronRight,
  CirclePause,
  CirclePlay,
  CircleStop,
  Dices,
  Disc3,
  ListMusic,
  ListRestart,
  Play,
  Repeat1,
  Settings2,
  Shuffle,
  Undo2,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, type ReactElement, useEffect, useState } from 'react'

type Props = {
  cards: CardResponse[]
  cardToSpeech?: CardResponse
  setCardToSpeech: (card?: CardResponse) => void
  setIsCardPlaying?: (isPlaying: boolean) => void
  playlistName?: string
}

type PlayMode = 'once' | 'repeat' | 'playlist' | 'shuffle'

let speechSynth: Nullable<SpeechSynthesis> = null
let utterance: Nullable<SpeechSynthesisUtterance> = null

if (typeof window !== 'undefined' && window.speechSynthesis) {
  speechSynth = speechSynthesis
  utterance = new SpeechSynthesisUtterance()
}

const DEFAULT_VOICE = 0
const DEFAULT_VOLUME = 0.5
const DEFAULT_RATE = 1
const DEFAULT_PITCH = 1
const DEFAULT_PLAY_MODE: PlayMode = 'once'

const getCardText = ({ id, title, content }: CardResponse) =>
  `Card #${id}\n${title}\n${content}`

const getCardIndex = (cards: CardResponse[], cardId: number) =>
  cards.findIndex(({ id }) => id === cardId)

export const TextToSpeech = ({
  cards,
  cardToSpeech,
  setCardToSpeech,
  setIsCardPlaying,
  playlistName,
}: Props) => {
  if (!speechSynth || !utterance) {
    return null
  }

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>()
  const [voice, setVoice] = useState<SpeechSynthesisVoice>()
  const [volume, setVolume] = useState(DEFAULT_VOLUME)
  const [rate, setRate] = useState(DEFAULT_RATE)
  const [pitch, setPitch] = useState(DEFAULT_PITCH)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaylistExpanded, setIsPlaylistExpanded] = useState(false)
  const [isVisualizationExpanded, setIsVisualizationExpanded] = useState(false)
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false)
  const [playMode, setPlayMode] = useState<PlayMode>(DEFAULT_PLAY_MODE)

  const hasCards = cards.length > 1
  const hasShuffleCards = cards.length > 2
  const playlistTitle = isPlaylistExpanded
    ? 'Collapse playlist'
    : 'Expand playlist'
  const visualizationTitle = isVisualizationExpanded
    ? 'Collapse visualization'
    : 'Expand visualization'
  const settingsTitle = isSettingsExpanded
    ? 'Collapse settings'
    : 'Expand settings'

  useEffect(() => speechSynth.cancel(), [])

  useEffect(() => {
    const loadVoices = () => {
      const loadedVoices = speechSynthesis.getVoices()

      if (loadedVoices.length > 0) {
        setVoices(loadedVoices)
        setVoice(loadedVoices[DEFAULT_VOICE])
      }
    }

    loadVoices()

    speechSynthesis.addEventListener('voiceschanged', loadVoices)

    return () =>
      speechSynthesis.removeEventListener('voiceschanged', loadVoices)
  }, [])

  useEffect(() => {
    if (!cardToSpeech || !voice) {
      return
    }

    utterance.voice = voice
    utterance.volume = volume
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.text = getCardText(cardToSpeech)

    switch (playMode) {
      case 'once':
        utterance.onend = () => onStop()
        break
      case 'repeat':
        utterance.onend = () => onPlay()
        break
      case 'playlist':
        utterance.onend = () => onNext()
        break
      case 'shuffle':
        utterance.onend = () => onShuffle()
    }
  }, [cardToSpeech, voice, volume, rate, pitch, playMode])

  useEffect(() => {
    if (!hasCards) {
      if (isPlaylistExpanded) setIsPlaylistExpanded(false)

      if (playMode === 'playlist' || playMode === 'shuffle')
        setPlayMode(DEFAULT_PLAY_MODE)
    }

    if (!hasShuffleCards && playMode === 'shuffle') setPlayMode('playlist')
  }, [hasCards, hasShuffleCards, isPlaylistExpanded, playMode])

  useEffect(() => setIsCardPlaying?.(isPlaying), [setIsCardPlaying, isPlaying])

  if (!cardToSpeech || !voices || !voice) {
    return null
  }

  let playModeIcon: ReactElement
  let playModeTitle: string

  switch (playMode) {
    case 'once':
      playModeIcon = <ArrowRightToLine />
      playModeTitle = 'Play once'
      break
    case 'repeat':
      playModeIcon = <Repeat1 />
      playModeTitle = 'Repeat card'
      break
    case 'playlist':
      playModeIcon = <ListRestart />
      playModeTitle = 'Repeat playlist'
      break
    case 'shuffle':
      playModeIcon = <Shuffle />
      playModeTitle = 'Play shuffled cards'
  }

  const onClose = () => {
    speechSynth.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCardToSpeech(undefined)
  }

  const onPrev = () => {
    speechSynth.cancel()
    setIsPlaying(true)
    setIsPaused(false)

    const cardToSpeechIndex = getCardIndex(cards, cardToSpeech.id)

    if (cardToSpeechIndex === -1) {
      return
    }

    const prevCard =
      cardToSpeechIndex === 0
        ? cards[cards.length - 1]
        : cards[cardToSpeechIndex - 1]

    setCardToSpeech(prevCard)

    utterance.text = getCardText(prevCard)
    speechSynth.speak(utterance)
  }

  const onPlay = () => {
    if (isPaused) {
      speechSynth.resume()
    } else {
      speechSynth.cancel()
      speechSynth.speak(utterance)
    }

    setIsPlaying(true)
    setIsPaused(false)
  }

  const onPause = () => {
    speechSynth.pause()
    setIsPlaying(false)
    setIsPaused(true)
  }

  const onStop = () => {
    speechSynth.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  const onNext = () => {
    speechSynth.cancel()
    setIsPlaying(true)
    setIsPaused(false)

    const cardToSpeechIndex = getCardIndex(cards, cardToSpeech.id)

    if (cardToSpeechIndex === -1) {
      return
    }

    const nextCard =
      cardToSpeechIndex === cards.length - 1
        ? cards[0]
        : cards[cardToSpeechIndex + 1]

    setCardToSpeech(nextCard)

    utterance.text = getCardText(nextCard)
    speechSynth.speak(utterance)
  }

  const onShuffle = () => {
    const shuffledCard = cards[Math.floor(Math.random() * cards.length)]

    if (shuffledCard.id === cardToSpeech.id) {
      return onShuffle()
    }

    speechSynth.cancel()
    setIsPlaying(true)
    setIsPaused(false)
    setCardToSpeech(shuffledCard)

    utterance.text = getCardText(shuffledCard)
    speechSynth.speak(utterance)
  }

  const onChangePlayMode = () => {
    switch (playMode) {
      case 'once':
        return setPlayMode('repeat')
      case 'repeat':
        if (hasCards) {
          return setPlayMode('playlist')
        }

        return setPlayMode('once')
      case 'playlist':
        if (hasShuffleCards) {
          return setPlayMode('shuffle')
        }

        return setPlayMode('once')
      case 'shuffle':
        setPlayMode('once')
    }
  }

  const onChangeCard = (card: CardResponse) => {
    speechSynth.cancel()
    setIsPlaying(true)
    setIsPaused(false)
    setCardToSpeech(card)

    utterance.text = getCardText(card)
    speechSynth.speak(utterance)
  }

  const onPlaylist = () => setIsPlaylistExpanded(!isPlaylistExpanded)

  const onResetSettings = () => {
    setVoice(voices[DEFAULT_VOICE])
    setVolume(DEFAULT_VOLUME)
    setRate(DEFAULT_RATE)
    setPitch(DEFAULT_PITCH)
    setPlayMode(DEFAULT_PLAY_MODE)
    setIsPlaylistExpanded(false)
    setIsVisualizationExpanded(false)
  }

  const onVisualization = () =>
    setIsVisualizationExpanded(!isVisualizationExpanded)

  const onSettings = () => setIsSettingsExpanded(!isSettingsExpanded)

  // ToDo: Refactor handlers naming and targets
  const onVoiceChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) =>
    setVoice(voices.find(({ name }) => name === value) ?? voices[DEFAULT_VOICE])

  const onSliderChange = (
    value: number | number[],
    set: (value: number) => void,
  ) => set(Array.isArray(value) ? value[0] : value)

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)

    element?.scrollIntoView({
      behavior: 'smooth',
      block: hasCards ? 'center' : 'start',
    })
  }

  // ToDo: Refactor JSX
  return (
    <div className='sticky bottom-6 mx-auto mt-6 flex max-w-fit flex-wrap justify-center truncate rounded-3xl border-2 border-accent bg-ground bg-opacity-70 shadow-inner backdrop-blur-xl dark:border-accent-dark dark:bg-ground-dark dark:bg-opacity-70'>
      <div className='flex flex-col gap-4 p-6'>
        <Heading as='h3' className='flex flex-wrap text-xl'>
          Text to speech:&nbsp;
          <Button
            variant='text'
            onClick={() => scrollToElement(String(cardToSpeech.id))}
            title='Scroll to card'
          >
            Card #{cardToSpeech.id}
          </Button>
        </Heading>
        <Wrapper className='gap-4'>
          {hasCards && (
            <Button variant='text' onClick={onPrev} title='Previous card'>
              <CircleChevronLeft />
            </Button>
          )}
          <Button variant='text' onClick={onPlay} title='Play'>
            <CirclePlay className={cn(isPlaying && 'animate-pulse')} />
          </Button>
          <Button variant='text' onClick={onPause} title='Pause'>
            <CirclePause className={cn(isPaused && 'animate-pulse')} />
          </Button>
          <Button variant='text' onClick={onStop} title='Stop'>
            <CircleStop />
          </Button>
          {hasCards && (
            <Button variant='text' onClick={onNext} title='Next card'>
              <CircleChevronRight />
            </Button>
          )}
          {hasShuffleCards && (
            <Button variant='text' onClick={onShuffle} title='Random card'>
              <Dices />
            </Button>
          )}
          <Button
            variant='text'
            title={playModeTitle}
            onClick={onChangePlayMode}
          >
            {playModeIcon}
          </Button>
          {hasCards && (
            <Button variant='text' onClick={onPlaylist} title={playlistTitle}>
              <ListMusic />
            </Button>
          )}
          <Button
            variant='text'
            onClick={onVisualization}
            title={visualizationTitle}
          >
            <Disc3 className='hover:animate-spin' />
          </Button>
          <Button variant='text' onClick={onSettings} title={settingsTitle}>
            <Settings2 />
          </Button>
          <Button
            variant='text'
            onClick={onResetSettings}
            title='Reset settings'
          >
            <Undo2 />
          </Button>
          <Button variant='text' onClick={onClose} title='Close'>
            <X />
          </Button>
        </Wrapper>
        {isPlaylistExpanded && (
          <div>
            <Heading as='h4' className='text-lg'>
              Playlist <q>{playlistName}</q>
            </Heading>
            <ul className='max-h-96 overflow-y-auto'>
              {cards.map(card => (
                <li key={card.id}>
                  {card.id === cardToSpeech.id ? (
                    <Wrapper>
                      <Play size={16} />
                      &nbsp;
                      {`#${card.id} ${card.title}`}
                    </Wrapper>
                  ) : (
                    <Button
                      variant='text'
                      onClick={() => onChangeCard(card)}
                      title='Play card'
                    >{`#${card.id} ${card.title}`}</Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {isSettingsExpanded && (
          <>
            <Heading as='h4' className='text-lg'>
              Settings:
            </Heading>
            <Select
              label='Voice'
              selectedKeys={[voice.name]}
              onChange={onVoiceChange}
              color='warning'
              items={voices}
              placeholder='Select voice'
              description='Available voices on your device'
            >
              {({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              )}
            </Select>
            <Wrapper className='gap-4'>
              <Slider
                label='Volume'
                defaultValue={volume}
                onChangeEnd={volume => onSliderChange(volume, setVolume)}
                minValue={0}
                maxValue={1}
                step={0.01}
                size='lg'
                color='warning'
                formatOptions={{ style: 'percent' }}
              />
              <Slider
                label='Rate'
                defaultValue={rate}
                onChangeEnd={rate => onSliderChange(rate, setRate)}
                minValue={0.1}
                maxValue={10}
                step={0.1}
                size='lg'
                color='warning'
              />
              <Slider
                label='Pitch'
                defaultValue={pitch}
                onChangeEnd={pitch => onSliderChange(pitch, setPitch)}
                minValue={0}
                maxValue={2}
                step={0.1}
                size='lg'
                color='warning'
                showSteps
              />
            </Wrapper>
          </>
        )}
      </div>
      {isVisualizationExpanded && (
        <div className='self-end'>
          <Image
            src='/gifs/visualization.gif'
            alt='Visualization'
            width='361'
            height='455'
            unoptimized
          />
        </div>
      )}
    </div>
  )
}
