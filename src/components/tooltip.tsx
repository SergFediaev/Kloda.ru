import { useThemes } from '@/hooks/useThemes'
import { cn } from '@/utils/mergeClasses'
import type { CSSProperties, ComponentProps, ReactNode } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

type CssOmitOpacity = Omit<CSSProperties, 'opacity'>

type Props = {
  anchorId: string
  children: ReactNode
  style?: CssOmitOpacity
  styleDark?: CssOmitOpacity
  styleLight?: CssOmitOpacity
} & Omit<ComponentProps<typeof ReactTooltip>, 'className' | 'children'>

export const Tooltip = ({
  anchorId,
  children,
  content,
  style,
  styleDark,
  styleLight,
  ...restProps
}: Props) => {
  if (!content) {
    return children ?? null
  }

  const { isDarkTheme } = useThemes()
  const styles = { ...style, ...(isDarkTheme ? styleDark : styleLight) }

  return (
    <>
      {/* Tooltip trigger */}
      <div id={anchorId}>{children}</div>
      <ReactTooltip
        anchorSelect={`#${anchorId}`}
        className={cn(
          isDarkTheme // Need ! in front of every tw class, though Docs state it's unnecessary
            ? '!bg-surface !text-primary'
            : '!bg-surface-dark !text-primary-light',
        )}
        style={styles}
        {...restProps}
      >
        {content}
      </ReactTooltip>
    </>
  )
}
