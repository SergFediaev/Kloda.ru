'use client'

import { TechCarouselContainer, TechsSlide } from '@/components/carousel'
import { useThemes } from '@/hooks/useThemes'
import type { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'

const TECH_LINKS: readonly { name: string; url: string }[] = [
  { name: 'Bun', url: 'https://bun.sh' },
  { name: 'EmailJS', url: 'https://www.emailjs.com/' },
  { name: 'Embla Carousel', url: 'https://www.embla-carousel.com/' },
  { name: 'Framer Motion', url: 'https://www.framer.com/motion/' },
  { name: 'HeroUI', url: 'https://www.heroui.com/' },
  { name: 'Holy Loader', url: 'https://github.com/tomcru/holy-loader' },
  { name: 'Ky', url: 'https://github.com/sindresorhus/ky' },
  { name: 'NextJS', url: 'https://nextjs.org/' },
  { name: 'React', url: 'https://reactjs.org/' },
  { name: 'React Hook Form', url: 'https://react-hook-form.com/' },
  { name: 'React Select', url: 'https://react-select.com/' },
  { name: 'React Toastify', url: 'https://fkhadra.github.io/react-toastify/' },
  { name: 'Tailwind', url: 'https://tailwindcss.com/' },
  { name: 'TanStack Query', url: 'https://tanstack.com/query/latest' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
  { name: 'Zod', url: 'https://zod.dev/' },
  { name: 'Zustand', url: 'https://zustand-demo.pmnd.rs/' },
] as const

type Props = {
  options?: EmblaOptionsType
}

export const TechCarousel = ({ options }: Props) => {
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({
      speed: 0.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  ])

  const { isDarkTheme } = useThemes()
  const tooltipStyle = isDarkTheme
    ? { backgroundColor: 'white', color: 'black' }
    : { backgroundColor: '#44403c', color: 'white' }

  return (
    <div ref={emblaRef} className='overflow-hidden'>
      <Tooltip id='tech-stack-tooltip' style={tooltipStyle} />
      <TechCarouselContainer
        data-tooltip-id='tech-stack-tooltip'
        data-tooltip-content='Our trusted tech stack for this app'
        data-tooltip-place='top'
      >
        {TECH_LINKS.map(({ name, url }, index) => (
          <TechsSlide key={`${index}-${name}`}>
            <Link
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground no-underline opacity-40 transition-opacity hover:text-foreground hover:underline hover:opacity-100 dark:text-inherit dark:hover:text-inherit'
            >
              {name}
            </Link>
          </TechsSlide>
        ))}
      </TechCarouselContainer>
    </div>
  )
}
