import { Carousel } from '@/components/carousel/carousel'
import { CoreFeatures } from '@/components/landing/coreFeatures'
import { Introduction } from '@/components/landing/introduction'
import { Statement } from '@/components/landing/statement'

export default function HomePage() {
  return (
    <div className='w-full'>
      <Introduction />
      <CoreFeatures />
      <Statement />
      <Carousel />
    </div>
  )
}