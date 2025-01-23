import { FeaturesContainer } from '@/components/carousel/featuresCarousel/featuresContainer'
import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import { Link } from 'next-view-transitions'

export const CustomizationSlide = () => {
  return (
    <FeaturesContainer>
      <Heading as='h3' isSemiBold className='font-bold text-2xl'>
        User friendly and highly customizable
      </Heading>
      <List hasIndent hasDisc className='flex flex-col gap-5'>
        <li>
          Simple, flexible design that scales seamlessly to any device or
          browser.
        </li>
        <li>
          Navigation experience is outstanding with featured category
          multi-select, pagination and multiple sort options.
        </li>

        <li>
          Critical actions, such as deleting items, are highlighted by color and
          trigger confirmation dialogs to provide safe delete options and
          prevent accidental data loss.
        </li>
        <li>
          Full-on <Link href='/manual'>user manual</Link> is readily available.
        </li>
      </List>
    </FeaturesContainer>
  )
}
