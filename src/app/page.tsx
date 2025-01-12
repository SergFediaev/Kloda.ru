import { CarouselSection } from '@/components/landing/carouselSection'
import { CoreFeaturesSection } from '@/components/landing/coreFeaturesSection'
import { IntroductionSection } from '@/components/landing/introductionSection'
import { StatementSection } from '@/components/landing/statementSection'

export default function HomePage() {
  return (
    <div className='w-full'>
      <IntroductionSection />
      <CoreFeaturesSection />
      <StatementSection />
      <CarouselSection />
    </div>
  )
}