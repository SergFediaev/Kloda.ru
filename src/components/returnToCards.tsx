import { Wrapper } from '@/components/containers/wrapper'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const ReturnToCards = () => (
  <Wrapper className='self-center'>
    <ArrowLeft size={16} />
    &nbsp;
    <Link href='/'>Return to cards</Link>
  </Wrapper>
)
