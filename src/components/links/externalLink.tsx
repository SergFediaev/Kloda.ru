import { Wrapper } from '@/components/containers/wrapper'
import { cn } from '@/utils/mergeClasses'
import { ExternalLink as Icon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  isIconLeft?: boolean
} & ComponentPropsWithoutRef<'a'>

export const ExternalLink = ({
  isIconLeft,
  className,
  ...restProps
}: Props) => {
  const icon = <Icon size={16} className={cn(isIconLeft && 'mr-4')} />

  return (
    <Wrapper>
      {isIconLeft && icon}
      <a
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          'text-inherit decoration-accent transition hover:text-accent dark:text-inherit dark:decoration-accent-dark dark:hover:text-accent-dark',
          className,
        )}
        {...restProps}
      />
      {!isIconLeft && (
        <>
          &nbsp;
          {icon}
        </>
      )}
    </Wrapper>
  )
}
