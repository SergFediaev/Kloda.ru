'use client'

import { TechsSlide } from '@/components/carousel/techstackCarousel/techsSlide'
import type { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

import TechCarouselContainer from '@/components/carousel/techstackCarousel/techCarouselContainer'
import Link from 'next/link'
import type React from 'react'

const techLinks: { name: string; url: string }[] = [
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
]

type PropType = {
  options?: EmblaOptionsType
}

const TechCarousel = ({ options }: PropType) => {
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ])

  return (
    <div ref={emblaRef} className='overflow-hidden'>
      <TechCarouselContainer>
        {techLinks.map(link => (
          <TechsSlide key={link.name}>
            <Link
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-inherit no-underline hover:text-inherit'
            >
              {link.name}
            </Link>
          </TechsSlide>
        ))}
      </TechCarouselContainer>
    </div>
  )
}

export default TechCarousel
