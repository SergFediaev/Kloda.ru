import { Subfield } from '@/components/forms/subfield'
import { useGenerateId } from '@/hooks/useGenerateId'
import { cn } from '@/utils/mergeClasses'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  forwardRef,
} from 'react'

export type InputProps = {
  label?: ReactNode
  error?: ReactNode
  characterCount?: number
  isHorizontal?: boolean
  hasBorder?: boolean
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      characterCount,
      isHorizontal,
      hasBorder,
      id,
      name,
      required,
      maxLength,
      className,
      ...restProps
    },
    ref,
  ) => {
    const inputId = useGenerateId(id, name)

    return (
      <div
        className={cn(
          'flex gap-1',
          isHorizontal ? 'flex-wrap items-start justify-between' : 'flex-col',
          className,
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            required && 'after:text-danger after:content-["*"]',
            isHorizontal && 'w-1/2',
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          maxLength={maxLength}
          className={cn(
            'truncate rounded-xl px-4 py-2 shadow-inner',
            hasBorder && 'border-2 border-accent dark:border-accent-dark',
            restProps.type === 'number' && 'text-right',
          )}
          {...restProps}
        />
        <Subfield
          error={error}
          characterCount={characterCount}
          maxLength={maxLength}
        />
      </div>
    )
  },
)
