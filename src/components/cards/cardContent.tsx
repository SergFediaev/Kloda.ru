import type { Nullable } from '@/types/nullable'
import { useRef } from 'react'

const REGEX_LINK = /https?:\/\/\S+|www\.\S+/g
const REGEX_IMAGE = /\.(?:png|jpe?g|gif|bmp|svg|webp)$/i
const REGEX_AUDIO = /\.(?:mp3|wav|ogg|aac)$/i
const REGEX_VIDEO = /\.(?:mp4|avi|mov|mkv|webm)$/i
const REGEX_YOUTUBE =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)/
const DEFAULT_VOLUME = 0.1

type ParsedElement =
  | {
      type: 'text'
      content: string
    }
  | {
      type: 'link' | 'image' | 'audio' | 'video' | 'youtube'
      url: string
      label?: string
    }

const addText = (
  start: number,
  end: number,
  elements: ParsedElement[],
  content: string,
) => {
  if (start < end)
    elements.push({ type: 'text', content: content.slice(start, end) })
}

const getMediaLink = (url: string): Nullable<ParsedElement> => {
  if (REGEX_IMAGE.test(url)) return { type: 'image', url }

  if (REGEX_AUDIO.test(url)) return { type: 'audio', url }

  if (REGEX_VIDEO.test(url)) return { type: 'video', url }

  if (REGEX_YOUTUBE.test(url)) return { type: 'youtube', url }

  return null
}

const parseContent = (content: string) => {
  const elements: ParsedElement[] = []
  let lastIndex = 0
  let linkMatch: Nullable<RegExpExecArray> = REGEX_LINK.exec(content)

  while (linkMatch !== null) {
    const url = linkMatch[0]
    const mediaLink = getMediaLink(url)
    const startIndex = linkMatch.index ?? 0

    addText(lastIndex, startIndex, elements, content)

    mediaLink
      ? elements.push(mediaLink)
      : elements.push({
          type: 'link',
          url,
          label: `[link #${elements.filter(({ type }) => type === 'link').length + 1}]`,
        })

    lastIndex = startIndex + url.length
    linkMatch = REGEX_LINK.exec(content)
  }

  addText(lastIndex, content.length, elements, content)

  return elements
}

const renderElement = (element: ParsedElement, index: number) => {
  const key = `${element.type}-${index}`

  switch (element.type) {
    case 'text':
      return <span key={key}>{element.content}</span>
    case 'link':
      return (
        <a
          key={key}
          href={element.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {element.label}
        </a>
      )
    case 'image':
      return (
        <a
          key={key}
          href={element.url}
          target='_blank'
          rel='noopener noreferrer'
          title='Open image in new tab'
          className='flex max-w-fit hover:outline hover:outline-1 hover:outline-accent hover:dark:outline-accent-dark'
        >
          <img
            src={element.url}
            alt={element.url.split('/').pop() ?? 'Image'}
          />
        </a>
      )
    case 'audio': {
      const ref = useRef<HTMLAudioElement>(null)

      if (ref.current) ref.current.volume = DEFAULT_VOLUME

      return (
        <audio
          key={key}
          src={element.url}
          ref={ref}
          controls
          className='w-full'
        >
          <track kind='captions' />
        </audio>
      )
    }
    case 'video': {
      const ref = useRef<HTMLVideoElement>(null)

      if (ref.current) ref.current.volume = DEFAULT_VOLUME

      return (
        <video
          key={key}
          src={element.url}
          ref={ref}
          controls
          className='w-full'
        >
          <track kind='captions' />
        </video>
      )
    }
    case 'youtube':
      return (
        <iframe
          key={key}
          src={`https://www.youtube-nocookie.com/embed/${element.url.split('v=')[1]}`}
          title={`YouTube video #${index}`}
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
          className='aspect-video w-full'
        />
      )
    default:
      return null
  }
}

type Props = {
  content: string
  isMediaShown: boolean
}

export const CardContent = ({ content, isMediaShown }: Props) => (
  <p className='whitespace-pre-wrap break-words'>
    {isMediaShown ? parseContent(content).map(renderElement) : content}
  </p>
)
