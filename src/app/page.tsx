import { CoreFeaturesSection } from '@/components/landing/sections/coreFeaturesSection'
import { FeaturesSection } from '@/components/landing/sections/featuresSection'
import { IntroductionSection } from '@/components/landing/sections/introductionSection'
import { StatementSection } from '@/components/landing/sections/statementSection'
import { TechSection } from '@/components/landing/sections/teckSection'

export default function HomePage() {
  return (
    <div className='w-full'>
      <IntroductionSection />
      <CoreFeaturesSection />
      <StatementSection />
      <FeaturesSection />
      {/*  <TechSection />*/}
    </div>
  )
}