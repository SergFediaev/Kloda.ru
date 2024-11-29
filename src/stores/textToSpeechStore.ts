import type { PlayMode } from '@/components/textToSpeech'
import type { Nullable } from '@/types/nullable'
import { create } from 'zustand'

type TextToSpeechState = {
  voice: Nullable<SpeechSynthesisVoice>
  volume: number
  rate: number
  pitch: number
  isPlaylistExpanded: boolean
  isVisualizationExpanded: boolean
  isSettingsExpanded: boolean
  playMode: PlayMode
}

type TextToSpeechActions = {
  setVoice: (voice: SpeechSynthesisVoice) => void
  setVolume: (volume: number) => void
  setRate: (rate: number) => void
  setPitch: (pitch: number) => void
  setIsPlaylistExpanded: (isPlaylistExpanded: boolean) => void
  setIsVisualizationExpanded: (isVisualizationExpanded: boolean) => void
  setIsSettingsExpanded: (isSettingsExpanded: boolean) => void
  setPlayMode: (playMode: PlayMode) => void
  resetTextToSpeech: () => void
}

const initialTextToSpeech: TextToSpeechState = {
  voice: null,
  volume: 0.5,
  rate: 1,
  pitch: 1,
  isPlaylistExpanded: false,
  isVisualizationExpanded: false,
  isSettingsExpanded: false,
  playMode: 'once',
}

export const textToSpeechStore = create<
  TextToSpeechState & TextToSpeechActions
>(set => ({
  ...initialTextToSpeech,
  setVoice: (voice: SpeechSynthesisVoice) => set({ voice }),
  setVolume: (volume: number) => set({ volume }),
  setRate: (rate: number) => set({ rate }),
  setPitch: (pitch: number) => set({ pitch }),
  setIsPlaylistExpanded: (isPlaylistExpanded: boolean) =>
    set({ isPlaylistExpanded }),
  setIsVisualizationExpanded: (isVisualizationExpanded: boolean) =>
    set({ isVisualizationExpanded }),
  setIsSettingsExpanded: (isSettingsExpanded: boolean) =>
    set({ isSettingsExpanded }),
  setPlayMode: (playMode: PlayMode) => set({ playMode }),
  resetTextToSpeech: () => set(initialTextToSpeech),
}))
