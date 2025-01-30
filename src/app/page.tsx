import { CoreFeaturesSection } from '@/components/landing/sections/coreFeaturesSection'
import { FeaturesSection } from '@/components/landing/sections/featuresSection'
import { PresentationSection } from '@/components/landing/sections/presentationSection'
import { StatementSection } from '@/components/landing/sections/statementSection'
import { TechSection } from '@/components/landing/sections/teckSection'
import { ScrollToTop } from '@/components/thumbButtons/scrollToTop'

export default function HomePage() {
  return (
    <div className='relative w-full'>
      <PresentationSection />
      <CoreFeaturesSection />
      <StatementSection />
      <FeaturesSection />
      <ScrollToTop className='left-[99%]' />
      <TechSection />
    </div>
  )
}