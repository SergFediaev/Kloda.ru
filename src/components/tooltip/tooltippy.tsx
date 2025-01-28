import { cn } from '@/utils/mergeClasses'
import { type ComponentProps, type ReactNode, useId } from 'react'
import { Tooltip } from 'react-tooltip'

type Props = {
  anchorId: string
  children?: ReactNode
  content: string | ReactNode
  clickable?: boolean
  float?: boolean
  offset?: number
} & ComponentProps<typeof Tooltip>

export const Tooltippy = ({
  anchorId,
  children,
  className,
  content,
  float,
  clickable,
  offset,
  ...restProps
}: Props) => {
  return (
    <>
      <div id={anchorId}>{children}</div>
      <Tooltip
        anchorSelect={`#${anchorId}`}
        float={float}
        offset={offset}
        {...restProps}
      >
        <div className={cn('bg-cyan-400 text-primary-dark', className)}>
          {content}
        </div>
      </Tooltip>
    </>
  )
}
