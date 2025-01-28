'use client'

import { TechCarouselContainer, TechsSlide } from '@/components/carousel'
import type { EmblaOptionsType } from 'embla-carousel'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

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

  return (
    <div ref={emblaRef} className='overflow-hidden'>
      <TechCarouselContainer>
        {TECH_LINKS.map(({ name, url }, index) => (
          <TechsSlide key={`${index}-${name}`}>
            <Link
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground no-underline opacity-40 transition-opacity hover:text-foreground hover:underline hover:decoration-inherit hover:opacity-80 dark:text-inherit dark:hover:text-inherit'
            >
              {name}
            </Link>
          </TechsSlide>
        ))}
      </TechCarouselContainer>
    </div>
  )
}
